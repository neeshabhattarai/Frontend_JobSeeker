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

interface Filters {
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
  const [jobToEdit, setJobToEdit] = useState<JobType | null>(null); // for editing

  const [filters, setFilters] = useState<Filters>({
    keyword: "",
    category: [],
    location: [],
    skill: [],
    employment: [],
    seniority: [],
  });

  const deleteSelected = (companyname: string) => {
    setLoadedData((prev) => prev.filter((val) => val.company !== companyname));
  };

  const updateFilter = (filterType: string, value: string) => {
    setFilters((prev) => {
      if (filterType === "keyword") return { ...prev, keyword: value };
      const exists = prev[filterType as keyof Filters].includes(value);
      return {
        ...prev,
        [filterType]: exists
          ? prev[filterType as keyof Filters].filter((v) => v !== value)
          : [...(prev[filterType as keyof Filters] as string[]), value],
      };
    });
  };

  // New function to update a job
  const updateJob = (updatedJob: JobType) => {
    setLoadedData((prev) =>
      prev.map((job) =>
        job.company === updatedJob.company ? { ...job, ...updatedJob } : job
      )
    );
  };

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
              setJobToEdit(null); // ensure form opens empty for new job
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

        {/* Main Layout */}
        <div className="flex flex-col md:flex-row md:space-x-5 space-y-7 md:space-y-0">
          <FilterList activeFilters={filters} onFilterChange={updateFilter} />

          <div className="flex-1 grid grid-cols-1 gap-5 md:grid-cols-2 p-4">
            {filteredData.map((val) => (
              <MappedList
                key={val.company}
                val={val}
                deleteSelected={deleteSelected}
                updateJob={(job: JobType) => updateJob(job)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
