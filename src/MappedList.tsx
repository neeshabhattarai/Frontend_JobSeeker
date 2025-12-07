import { useState } from "react";
import type { JobType } from "./App";
import EditForm from "./EditForm";

export default function MappedList({
  val,
  deleteSelected,

  updateJob,
}: {
  val: JobType;
  deleteSelected: (companyname: string) => void;

  updateJob: (updatedJob: JobType) => void;
}) {
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <div className="flex flex-col space-y-3 p-4 rounded-md shadow-lg relative md:h-70">
      <div className="flex justify-between items-center">
        <div className="h-10 w-12">
          <img src={`http://localhost:5000/images/` + val.image} alt="" />
        </div>
        <div className="opacity-80">{val.posted_date}</div>
      </div>
      <div>
        <h5 className=" font-bold">{val.title}</h5>
        <div className="text-xl opacity-80">{val.company}</div>
      </div>
      <div className="flex space-x-3">
        {val.work.map((det) => (
          <button
            className={`px-3 py-0 ${
              det == "On Site"
                ? "bg-amber-200/30 text-amber-900"
                : det == "Remote"
                ? "bg-blue-100/30 text-blue-700"
                : det == "Contract"
                ? "bg-cyan-200/30 text-cyan-600"
                : ""
            }`}
          >
            {det}
          </button>
        ))}
      </div>
      <div className="flex space-x-8 font-semibold">
        <div className="text-xl  inline-flex tracking-tight items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 text-blue-600 font-semibold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <span className="ml-2">{val.location}</span>
        </div>
        <div className="inline-flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-4 text-blue-600 font-semibold"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span className="ml-2">{val.salary}</span>
        </div>
      </div>
      <div className="inline-flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-4 text-blue-600 font-semibold"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        <span className="ml-2 font-semibold">{val.category}</span>
      </div>
      <div className="absolute bottom-2 right-2 flex space-x-8">
        <div className="rounded-full h-9 w-9 flex items-center justify-center bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            onClick={() => setOpenEdit(true)}
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          {openEdit && (
            <EditForm
              existing={val}
              onClose={() => setOpenEdit(false)}
              onSave={(updated) => {
                updateJob(updated);
                setOpenEdit(false);
              }}
            />
          )}
        </div>
        <div className="rounded-full h-9 w-9 flex items-center justify-center bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
            onClick={() => deleteSelected(val.company)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
