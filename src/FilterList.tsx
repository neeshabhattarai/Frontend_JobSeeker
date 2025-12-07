interface FilterListProps {
  onFilterChange: (filterType: string, value: string) => void;
  activeFilters: {
    category: string[];
    location: string[];
    skill: string[];
    employment: string[];
    seniority: string[];
  };
}

export default function FilterList({
  onFilterChange,
  activeFilters,
}: FilterListProps) {
  const buttonClass = (isActive: boolean) =>
    `px-3 py-1 rounded ${
      isActive ? "bg-blue-600 text-white" : " hover:bg-gray-300"
    }`;

  return (
    <div className="flex flex-col space-y-5 shadow-lg rounded-md p-4 md:max-w-[30%]">
      {/* Keyword Search */}
      <div className="relative">
        <span className="absolute top-3 left-2 rotate-90 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </span>
        <input
          type="text"
          className="pl-9 py-2 rounded-lg bg-white hover:ring-2 shadow hover:ring-black placeholder:text-gray-300 placeholder:font-semibold w-full"
          placeholder="Search by keywords"
          onChange={(e) => onFilterChange("keyword", e.target.value)}
        />
      </div>

      {/* Job Type */}
      <div className="flex-col">
        <div className="text-xl font-bold tracking-tight">Job Type</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "Sales/Marketing",
            "Engineer",
            "IT",
            "Product",
            "Design",
            "Business Dev",
            "Others",
          ].map((v) => (
            <button
              key={v}
              className={buttonClass(activeFilters.category.includes(v))}
              onClick={() => onFilterChange("category", v)}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="flex flex-col">
        <div className="text-xl font-bold tracking-tight">Location</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["United States", "Hong Kong", "Indonesia"].map((v) => (
            <button
              key={v}
              className={buttonClass(activeFilters.location.includes(v))}
              onClick={() => onFilterChange("location", v)}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-col">
        <div className="text-xl font-bold tracking-tight">Skills</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "PHP",
            "C++",
            "JavaScript",
            "Backend",
            "Python",
            "Ruby",
            "Security",
          ].map((v) => (
            <button
              key={v}
              className={buttonClass(activeFilters.skill.includes(v))}
              onClick={() => onFilterChange("skill", v)}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Employment */}
      <div className="flex flex-col">
        <div className="text-xl font-bold tracking-tight">Employment Type</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "Full Time",
            "Part Time",
            "Contract",
            "Freelance",
            "Remote",
            "On Site",
          ].map((v) => (
            <button
              key={v}
              className={buttonClass(activeFilters.employment.includes(v))}
              onClick={() => onFilterChange("employment", v)}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Seniority */}
      <div className="flex flex-col">
        <div className="text-xl font-bold tracking-tight">Seniority Level</div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            className={buttonClass(activeFilters.seniority.includes("Senior"))}
            onClick={() => onFilterChange("seniority", "Senior")}
          >
            Senior
          </button>
        </div>
      </div>
    </div>
  );
}
