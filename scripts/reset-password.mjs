#!/usr/bin/env node
// Reset or set password for any user in Supabase Auth
// Usage:
//   node --env-file=.env.local scripts/reset-password.mjs [email] [new_password]
// Example:
//   node --env-file=.env.local scripts/reset-password.mjs gaurav@gmail.com 123456

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

if (!SUPABASE_URL || !SECRET_KEY) {
  console.error("Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in environment.");
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SECRET_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const targetEmail = process.argv[2] || "gaurav@gmail.com";
const newPassword = process.argv[3] || "123456";

async function main() {
  console.log(`Looking up user "${targetEmail}" in Supabase...`);

  // Find user by email
  const { data: { users }, error: listErr } = await sb.auth.admin.listUsers();
  if (listErr) {
    console.error("Failed to list users:", listErr.message);
    process.exit(1);
  }

  const user = users.find((u) => u.email?.toLowerCase() === targetEmail.toLowerCase());

  if (!user) {
    console.log(`User "${targetEmail}" not found. Creating new user...`);
    const { data: newUser, error: createErr } = await sb.auth.admin.createUser({
      email: targetEmail,
      password: newPassword,
      email_confirm: true,
      user_metadata: { role: "admin" },
    });
    if (createErr) {
      console.error("Failed to create user:", createErr.message);
      process.exit(1);
    }
    console.log(`✓ User created successfully with email: ${targetEmail}`);
    console.log(`✓ User ID: ${newUser.user?.id}`);
    console.log(`✓ Password set to: ${newPassword}`);
    return;
  }

  console.log(`Found user: ${user.id} (${user.email})`);
  console.log(`Updating password...`);

  const { data: updated, error: updateErr } = await sb.auth.admin.updateUserById(user.id, {
    password: newPassword,
    email_confirm: true,
  });

  if (updateErr) {
    console.error("Failed to update password:", updateErr.message);
    process.exit(1);
  }

  console.log(`✓ Password successfully reset for ${updated.user?.email}`);
  console.log(`✓ New password: ${newPassword}`);
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
