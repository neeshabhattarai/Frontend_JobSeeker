import { useState } from "react";
import type { JobType } from "./App";

export default function AddJobModal({
  closeModal,
  setJobs,
}: {
  closeModal: () => void;
  setJobs: React.Dispatch<React.SetStateAction<JobType[]>>;
}) {
  const jobTypes = ["Design", "Development", "Sales/Marketing", "Finance"];
  const employmentTypes = ["Full Time", "Part Time", "Internship", "Contract"];
  const seniorityLevels = ["Junior", "Mid-Level", "Senior", "Lead"];

  const [formData, setFormData] = useState({
    title: "",
    jobType: "",
    employmentType: "",
    seniority: "",
    salary: "",
    company: "",
    logo: "",
    location: "",
  });

  // handle input change
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: files ? URL.createObjectURL(files[0]) : value, // handle file input
    });
  }

  // Publish button
  function handlePublish() {
    const newJob: JobType = {
      title: formData.title,
      company: formData.company,
      image: formData.logo,
      location: formData.location,
      salary: formData.salary,
      category: formData.jobType,
      work: [formData.employmentType, "Remote"],
      posted_date: new Date().toDateString(),
    };

    setJobs((prev: JobType[]) => [...prev, newJob]);

    // clear modal fields
    setFormData({
      title: "",
      jobType: "",
      employmentType: "",
      seniority: "",
      salary: "",
      company: "",
      logo: "",
      location: "",
    });
    closeModal();
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add Job</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-black text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4">
          {/* Job Title */}
          <div className="col-span-2">
            <label className="text-sm text-gray-600 font-medium">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              placeholder="Enter Job Title"
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 rounded-md bg-gray-200/40 focus:outline-blue-500"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Job Type <span className="text-red-500">*</span>
            </label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 rounded-md bg-gray-200/40"
            >
              <option value="">Select Job Type</option>
              {jobTypes.map((type, i) => (
                <option key={i} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Employment Type */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Employment Type <span className="text-red-500">*</span>
            </label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 rounded-md bg-gray-200/40"
            >
              <option value="">Select Employment Type</option>
              {employmentTypes.map((type, i) => (
                <option key={i} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Seniority Level */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Seniority Level <span className="text-red-500">*</span>
            </label>
            <select
              name="seniority"
              value={formData.seniority}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 rounded-md bg-gray-200/40"
            >
              <option value="">Select Level</option>
              {seniorityLevels.map((level, i) => (
                <option key={i} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Salary <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center rounded-md bg-gray-200/40 mt-1 px-3">
              <span className="text-gray-500 mr-2">$</span>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                placeholder="Enter Salary"
                onChange={handleChange}
                className="w-full py-2 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Company Name */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              placeholder="Enter Company Name"
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-200/40 mt-1"
            />
          </div>

          {/* Company Logo */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Company Logo
            </label>
            <input
              type="file"
              name="logo"
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-200/40 mt-1"
            />
          </div>

          {/* Location */}
          <div className="col-span-2">
            <label className="text-sm text-gray-600 font-medium">
              Company Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              placeholder="Enter Location"
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-200/40 mt-1"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-start gap-3 mt-8">
          <button
            onClick={closeModal}
            className="px-4 py-1 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            className="px-5 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
