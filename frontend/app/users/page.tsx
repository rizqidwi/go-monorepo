"use client";

import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/lib/api";
import { User } from "@/types/user";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  async function loadUsers() {
    const data = await getUsers();
    setUsers(data);
  }

  async function handleSave() {
    if (!name || !email) return;

    if (editId) {
      await updateUser(editId, { name, email });
      setEditId(null);
    } else {
      await createUser({ name, email });
    }

    setName("");
    setEmail("");
    loadUsers();
  }

  function handleEdit(user: User) {
    setEditId(user.id);
    setName(user.name);
    setEmail(user.email);
  }

  async function handleDelete(id: string) {
    await deleteUser(id);
    loadUsers();
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">User Management</h1>

      {/* FORM */}
      <div className="space-y-3 mb-6">
        <input
          className="w-full border rounded p-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full border rounded p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update User" : "Create User"}
        </button>

        {editId && (
          <button
            onClick={() => {
              setEditId(null);
              setName("");
              setEmail("");
            }}
            className="text-sm text-gray-500"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* LIST */}
      <ul className="space-y-2">
        {users.map((u) => (
          <li
            key={u.id}
            className="flex justify-between items-center border rounded p-2"
          >
            <span>
              {u.name} | {u.email}
            </span>

            <div className="space-x-2">
              <button
                onClick={() => handleEdit(u)}
                className="text-yellow-600 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(u.id)}
                className="text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
