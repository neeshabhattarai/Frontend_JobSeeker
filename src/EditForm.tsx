import React, { useState } from "react";
import type { JobType } from "./App";

export default function EditForm({
  existing,
  onSave,
  onClose,
}: {
  existing: JobType;
  onSave: (updated: JobType) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ ...existing });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96 space-y-4 shadow-xl">
        <h2 className="text-xl font-bold">Edit Job</h2>

        <input
          className="border p-2 w-full rounded"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          className="border p-2 w-full rounded"
          name="company"
          value={form.company}
          onChange={handleChange}
        />

        <input
          className="border p-2 w-full rounded"
          name="location"
          value={form.location}
          onChange={handleChange}
        />

        <input
          className="border p-2 w-full rounded"
          name="salary"
          value={form.salary}
          onChange={handleChange}
        />

        <input
          className="border p-2 w-full rounded"
          name="category"
          value={form.category}
          onChange={handleChange}
        />

        <div className="flex justify-between mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => onSave(form)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
