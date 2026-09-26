import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/supabase";

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY");
  }
  return createClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function verifyAuthUser() {
  const sb = await supabaseServer();
  if (!sb) return null;
  const { data: { user }, error } = await sb.auth.getUser();
  if (error || !user) return null;
  return user;
}

export async function GET() {
  const caller = await verifyAuthUser();
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sb = getAdminClient();
    const { data: { users }, error } = await sb.auth.admin.listUsers();
    if (error) throw error;

    const sanitizedUsers = users.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.user_metadata?.name || u.email?.split("@")[0] || "Admin User",
      role: u.user_metadata?.role || "admin",
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at,
    }));

    return NextResponse.json({ users: sanitizedUsers, currentUserId: caller.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch users";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const caller = await verifyAuthUser();
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { email, password, name, role = "admin" } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const sb = getAdminClient();
    const { data, error } = await sb.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name: name || email.split("@")[0], role },
    });

    if (error) throw error;

    return NextResponse.json({
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
        role: data.user.user_metadata?.role,
        created_at: data.user.created_at,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create user";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const caller = await verifyAuthUser();
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, email, password, name, role } = body;

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const sb = getAdminClient();
    const updatePayload: Record<string, unknown> = {};

    if (email) updatePayload.email = email;
    if (password) {
      if (password.length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
      }
      updatePayload.password = password;
    }

    if (name !== undefined || role !== undefined) {
      updatePayload.user_metadata = {
        ...(name !== undefined ? { name } : {}),
        ...(role !== undefined ? { role } : {}),
      };
    }

    const { data, error } = await sb.auth.admin.updateUserById(id, updatePayload);
    if (error) throw error;

    return NextResponse.json({
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
        role: data.user.user_metadata?.role,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update user";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const caller = await verifyAuthUser();
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Prevent user from accidentally deleting themselves
    if (caller.id === id) {
      return NextResponse.json(
        { error: "You cannot delete your own logged-in account." },
        { status: 400 },
      );
    }

    const sb = getAdminClient();
    const { data: { users }, error: listErr } = await sb.auth.admin.listUsers();
    if (listErr) throw listErr;

    const targetUser = users.find((u) => u.id === id);
    if (!targetUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Check if target is admin and if they are the last remaining admin
    const targetRole = targetUser.user_metadata?.role || "admin";
    if (targetRole === "admin") {
      const adminCount = users.filter((u) => (u.user_metadata?.role || "admin") === "admin").length;
      if (adminCount <= 1) {
        return NextResponse.json(
          { error: "Cannot delete the only remaining admin account. At least one admin is required." },
          { status: 400 },
        );
      }
    }

    const { error } = await sb.auth.admin.deleteUser(id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete user";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
