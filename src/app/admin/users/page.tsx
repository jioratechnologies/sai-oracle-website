"use client";

import { useEffect, useState, useTransition } from "react";
import {
  UserPlus,
  Users,
  Shield,
  Key,
  Trash2,
  Edit2,
  X,
  Search,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
  last_sign_in_at: string | null;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [deletingUser, setDeletingUser] = useState<AdminUser | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to load users");
      }
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function handleOpenAdd() {
    setFormData({ name: "", email: "", password: "", role: "admin" });
    setShowPassword(false);
    setError(null);
    setIsAddOpen(true);
  }

  function handleOpenEdit(user: AdminUser) {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "", // blank unless changing
      role: user.role,
    });
    setShowPassword(false);
    setError(null);
  }

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create user");

        setSuccess(`User ${formData.email} created successfully!`);
        setIsAddOpen(false);
        fetchUsers();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create user");
      }
    });
  }

  async function handleUpdateUser(e: React.FormEvent) {
    e.preventDefault();
    if (!editingUser) return;
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      try {
        const payload: Record<string, string> = {
          id: editingUser.id,
          name: formData.name,
          email: formData.email,
          role: formData.role,
        };
        if (formData.password) {
          payload.password = formData.password;
        }

        const res = await fetch("/api/admin/users", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update user");

        setSuccess(`User ${formData.email} updated successfully!`);
        setEditingUser(null);
        fetchUsers();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update user");
      }
    });
  }

  async function handleDeleteUser() {
    if (!deletingUser) return;
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/users?id=${deletingUser.id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to delete user");

        setSuccess(`User ${deletingUser.email} deleted successfully.`);
        setDeletingUser(null);
        fetchUsers();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete user");
      }
    });
  }

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-maroon-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-saffron-100 text-saffron-800">
              <Users className="h-5 w-5" />
            </span>
            <h1 className="font-display text-2xl font-bold text-maroon-900">
              User Management
            </h1>
          </div>
          <p className="mt-1 text-sm text-stone-500">
            Manage admin users, credentials, roles, and access controls for Sai Oracle.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchUsers}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="btn-festive inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:shadow-lg"
          >
            <UserPlus className="h-4 w-4" />
            Add New User
          </button>
        </div>
      </div>

      {/* Notifications */}
      {success && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800 animate-in fade-in">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <span>{success}</span>
          <button
            type="button"
            onClick={() => setSuccess(null)}
            className="ml-auto text-emerald-600 hover:text-emerald-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-800 animate-in fade-in">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="ml-auto text-red-600 hover:text-red-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-stone-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-200 shadow-2xs"
        />
      </div>

      {/* Users List */}
      {loading ? (
        <div className="rounded-2xl border border-maroon-100 bg-white p-12 text-center text-stone-500">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-saffron-600 border-r-transparent align-[-0.125em]" />
          <p className="mt-3 text-sm font-medium">Loading user accounts...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="rounded-2xl border border-maroon-100 bg-white p-10 text-center text-stone-500">
          <Users className="mx-auto h-10 w-10 text-stone-300" />
          <p className="mt-3 text-base font-semibold text-stone-700">No users found</p>
          <p className="text-xs text-stone-500">
            {search ? "No users match your search criteria." : "Create your first user above."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-maroon-100 bg-white shadow-xs">
          <table className="w-full text-left text-sm text-stone-600">
            <thead className="border-b border-stone-100 bg-stone-50/75 text-xs font-bold text-maroon-900 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">User</th>
                <th className="px-5 py-3.5">Role</th>
                <th className="px-5 py-3.5 hidden md:table-cell">Created</th>
                <th className="px-5 py-3.5 hidden lg:table-cell">Last Active</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-amber-50/40 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-saffron-500 to-maroon-700 text-white font-bold text-sm shadow-2xs">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-maroon-950">{user.name}</div>
                        <div className="text-xs text-stone-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-saffron-100 px-2.5 py-0.5 text-xs font-bold text-saffron-800 capitalize border border-saffron-200">
                      <Shield className="h-3 w-3 text-saffron-700" />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell text-xs text-stone-500">
                    {new Date(user.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell text-xs text-stone-500">
                    {user.last_sign_in_at
                      ? new Date(user.last_sign_in_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Never"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(user)}
                        title="Edit user details / password"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingUser(user)}
                        title="Delete user"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add User Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-maroon-100 bg-white shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
              <h3 className="font-display text-lg font-bold text-maroon-900">
                Add New Admin User
              </h3>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="space-y-4 p-6">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gaurav Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm outline-none focus:border-saffron-500 focus:bg-white focus:ring-2 focus:ring-saffron-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="gaurav@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm outline-none focus:border-saffron-500 focus:bg-white focus:ring-2 focus:ring-saffron-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Password (min 6 characters)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    placeholder="Enter strong password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm outline-none focus:border-saffron-500 focus:bg-white focus:ring-2 focus:ring-saffron-200 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm outline-none focus:border-saffron-500 focus:bg-white focus:ring-2 focus:ring-saffron-200"
                >
                  <option value="admin">Admin (Full Access)</option>
                  <option value="editor">Editor (Events, Gallery, Updates)</option>
                  <option value="staff">Staff (View & Basic Entry)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="rounded-xl border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-festive rounded-xl px-5 py-2 text-sm font-bold text-white shadow-md disabled:opacity-50"
                >
                  {isPending ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-maroon-100 bg-white shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
              <h3 className="font-display text-lg font-bold text-maroon-900">
                Edit User: {editingUser.email}
              </h3>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateUser} className="space-y-4 p-6">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm outline-none focus:border-saffron-500 focus:bg-white focus:ring-2 focus:ring-saffron-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm outline-none focus:border-saffron-500 focus:bg-white focus:ring-2 focus:ring-saffron-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Change Password (leave blank to keep current)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    minLength={6}
                    placeholder="Enter new password (optional)"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm outline-none focus:border-saffron-500 focus:bg-white focus:ring-2 focus:ring-saffron-200 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm outline-none focus:border-saffron-500 focus:bg-white focus:ring-2 focus:ring-saffron-200"
                >
                  <option value="admin">Admin (Full Access)</option>
                  <option value="editor">Editor (Events, Gallery, Updates)</option>
                  <option value="staff">Staff (View & Basic Entry)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="rounded-xl border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-festive rounded-xl px-5 py-2 text-sm font-bold text-white shadow-md disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-red-200 bg-white p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mx-auto">
              <Trash2 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-center font-display text-lg font-bold text-maroon-900">
              Delete User Account?
            </h3>
            <p className="mt-2 text-center text-xs leading-relaxed text-stone-600">
              Are you sure you want to delete <strong className="text-stone-900">{deletingUser.email}</strong>? This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingUser(null)}
                className="rounded-xl border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteUser}
                disabled={isPending}
                className="rounded-xl bg-red-600 px-5 py-2 text-sm font-bold text-white shadow-md hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {isPending ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
