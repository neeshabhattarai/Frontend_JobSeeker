import { useEffect, useState } from "react";
import FilterList from "./FilterList";
import MappedList from "./MappedList";
import AddJobForm from "./AddNew";
import NavBar from "./NavBar";
import MainHeader from "./MainHeader";

export interface JobType {
  title: string;
  image: string;
  salary: string;
  company: string;
  posted_date: string;
  location: string;
  category: string;
  work: string[];
}

export interface Filters {
  keyword: string;
  category: string[];
  location: string[];
  skill: string[];
  employment: string[];
  seniority: string[];
}

export default function JobUI() {
  const [dataLoaded, setLoadedData] = useState<JobType[]>([]);
  const [isLoading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  //eslint-disable-next-line
  const [, setJobToEdit] = useState<JobType | null>(null);

  const [filters, setFilters] = useState<Filters>({
    keyword: "",
    category: [],
    location: [],
    skill: [],
    employment: [],
    seniority: [],
  });

  // ------------------------
  // DELETE JOB
  // ------------------------
  const deleteSelected = (companyname: string) => {
    setLoadedData((prev) => prev.filter((val) => val.company !== companyname));
  };

  // ------------------------
  // FIXED TS-SAFE FILTER HANDLER
  // ------------------------
  const updateFilter = (filterType: keyof Filters, value: string) => {
    setFilters((prev) => {
      if (filterType === "keyword") {
        return { ...prev, keyword: value };
      }

      const arr = prev[filterType] as string[];
      const exists = arr.includes(value);

      return {
        ...prev,
        [filterType]: exists ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  // ------------------------
  // UPDATE JOB
  // ------------------------
  const updateJob = (updatedJob: JobType) => {
    setLoadedData((prev) =>
      prev.map((job) =>
        job.company === updatedJob.company ? { ...job, ...updatedJob } : job
      )
    );
  };

  // ------------------------
  // LOAD DATA
  // ------------------------
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await fetch("https://backend-job-seeker.vercel.app/");
      const data = await res.json();
      setLoadedData(data);
      setLoading(false);
    }
    loadData();
  }, []);

  // ------------------------
  // FILTERED DATA
  // ------------------------
  const filteredData = dataLoaded.filter((job) => {
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      const inTitle = job.title.toLowerCase().includes(keyword);
      const inCategory = job.category.toLowerCase().includes(keyword);
      const inLocation = job.location.toLowerCase().includes(keyword);
      const inWork = job.work.some((w) => w.toLowerCase().includes(keyword));

      if (!inTitle && !inCategory && !inLocation && !inWork) return false;
    }
    if (filters.category.length && !filters.category.includes(job.category))
      return false;

    if (filters.location.length && !filters.location.includes(job.location))
      return false;

    if (
      filters.skill.length &&
      !filters.skill.some((skill) =>
        job.work.map((w) => w.toLowerCase()).includes(skill.toLowerCase())
      )
    )
      return false;

    if (
      filters.employment.length &&
      !filters.employment.some((emp) =>
        job.work.map((w) => w.toLowerCase()).includes(emp.toLowerCase())
      )
    )
      return false;

    if (
      filters.seniority.length &&
      !filters.seniority.some((sen) =>
        job.title.toLowerCase().includes(sen.toLowerCase())
      )
    )
      return false;

    return true;
  });
  if (isLoading) {
    return (
      <h3 className="h-screen w-full flex justify-center items-center text-gray-500">
        loading.....
      </h3>
    );
  }

  // ------------------------
  // RETURN JSX
  // ------------------------
  return (
    <div className="p-4">
      <NavBar />

      <main className="max-w-6xl mx-auto flex flex-col space-y-7">
        <MainHeader />

        <div className="mt-2 flex justify-between items-center text-[1.2rem]">
          <div className="font-bold">Filter</div>

          <div className="font-bold">{filteredData.length} Jobs</div>

          <button
            onClick={() => {
              setJobToEdit(null);
              setShowForm(true);
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-md text-xl"
          >
            Add New Job
          </button>

          {showForm && (
            <AddJobForm
              setJobs={setLoadedData}
              closeModal={() => setShowForm(false)}
            />
          )}
        </div>

        {/* LAYOUT */}
        <div className="flex flex-col md:flex-row md:space-x-5 space-y-7 md:space-y-0">
          {/* FILTER LIST */}
          <FilterList
            activeFilters={filters}
            onFilterChange={(type, value) =>
              updateFilter(type as keyof Filters, value)
            }
          />

          {/* JOB LIST */}
          <div className="flex-1 grid grid-cols-1 gap-5 md:grid-cols-2 p-4">
            {filteredData.map((val) => (
              <MappedList
                key={val.company}
                val={val}
                deleteSelected={deleteSelected}
                updateJob={updateJob}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
