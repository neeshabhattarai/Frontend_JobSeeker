import React, { useState } from "react";

export default function JobListingUI() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#E8EDFF] p-6 flex justify-center">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-6xl">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-700">Jobseeker</h1>
          <nav className="flex gap-6 text-gray-600 font-medium">
            <a>Jobs</a>
            <a>Companies</a>
            <a>About Us</a>
          </nav>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-800">
            The <span className="text-blue-600">Most Complete</span> Job
            Listings In The World
          </h2>
          <p className="text-gray-500 mt-2">
            Discover the job you want at top companies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="bg-white border rounded-xl p-4 shadow-sm h-fit">
            <h3 className="text-lg font-semibold mb-4">Filter</h3>

            <input
              className="w-full p-2 border rounded mb-4"
              placeholder="Search by keyword"
            />

            {/* Job Type */}
            <p className="font-semibold mb-2">Job Type</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Marketing", "Engineer", "Product", "Design"].map((t) => (
                <button
                  key={t}
                  className="px-3 py-1 rounded-full border text-sm"
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Location */}
            <p className="font-semibold mb-2">Location</p>
            <input
              className="w-full p-2 border rounded mb-4"
              placeholder="City"
            />

            {/* Skills */}
            <p className="font-semibold mb-2">Skills</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["React", "Node", "Figma", "Laravel", "Public Speaking"].map(
                (s) => (
                  <button
                    key={s}
                    className="px-3 py-1 rounded-full border text-sm"
                  >
                    {s}
                  </button>
                )
              )}
            </div>

            {/* Employment Type */}
            <p className="font-semibold mb-2">Employment Type</p>
            <div className="space-y-2 mb-4">
              {["Full Time", "Part Time", "Contract", "Freelance"].map((e) => (
                <label key={e} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" /> {e}
                </label>
              ))}
            </div>

            {/* Seniority */}
            <p className="font-semibold mb-2">Seniority Level</p>
            <div className="space-y-2">
              {["Intern", "Junior", "Mid-Level", "Senior"].map((s) => (
                <label key={s} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" /> {s}
                </label>
              ))}
            </div>
          </div>

          {/* Job Listing */}
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600 font-medium">5,283 Jobs</p>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
              >
                Add New Job
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((job) => (
                <div
                  key={job}
                  className="bg-white p-4 rounded-xl border shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-lg text-gray-800">
                      Senior Backend Engineer
                    </h4>
                    <span className="text-gray-400 text-sm">July 7, 2022</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">United States</p>
                  <p className="font-semibold">$7,000</p>
                  <p className="text-blue-600 text-sm mt-1">Sales/Marketing</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Job Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white w-96 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Job</h2>

            <input
              className="w-full p-2 border rounded mb-3"
              placeholder="Job Title"
            />
            <select className="w-full p-2 border rounded mb-3">
              <option>Select Job Type</option>
            </select>
            <select className="w-full p-2 border rounded mb-3">
              <option>Employment Type</option>
            </select>
            <select className="w-full p-2 border rounded mb-3">
              <option>Seniority Level</option>
            </select>
            <input
              className="w-full p-2 border rounded mb-3"
              placeholder="Salary"
            />
            <input
              className="w-full p-2 border rounded mb-3"
              placeholder="Company Name"
            />
            <input
              className="w-full p-2 border rounded mb-3"
              placeholder="Company Location"
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded border"
              >
                Cancel
              </button>
              <button className="flex-1 py-2 rounded bg-blue-600 text-white">
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
