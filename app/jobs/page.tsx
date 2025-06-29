import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q, type, location } = await searchParams;

  const query = q as string | undefined;
  const searchType = type as string | undefined;
  const searchLocation = location as string | undefined;

  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        query
          ? {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { company: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
              ],
            }
          : {},
        type ? { type: searchType } : {},
        searchLocation
          ? { location: { contains: searchLocation, mode: "insensitive" } }
          : {},
      ],
    },
    orderBy: { postedAt: "desc" },
    include: { postedBy: true },
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Discover Your Next Opportunity
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse through thousands of job opportunities from top companies
            worldwide
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-gray-50 p-8 rounded-2xl mb-12 border border-gray-100">
          <form className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <input
                type="text"
                name="q"
                placeholder="Search jobs, companies, keywords..."
                defaultValue={query}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
              />
            </div>
            <select
              name="type"
              defaultValue={searchType}
              className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900"
            >
              <option value="">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
            <input
              type="text"
              name="location"
              placeholder="Location"
              defaultValue={searchLocation}
              className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
            />
            <button
              type="submit"
              className="md:col-span-4 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Search Jobs
            </button>
          </form>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Found{" "}
            <span className="font-semibold text-gray-900">{jobs.length}</span>{" "}
            opportunities
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-200 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-900 font-semibold">
                      {job.company.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {job.title}
                    </h2>
                    <p className="text-gray-600 font-medium mb-3">
                      {job.company}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{job.location}</span>
                      <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium">
                        {job.type}
                      </span>
                    </div>
                  </div>
                </div>
                {job.salary && (
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      {job.salary}
                    </div>
                    <div className="text-gray-500 text-sm">per year</div>
                  </div>
                )}
              </div>

              <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                {job.description}
              </p>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex items-center text-gray-500 text-sm">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xs font-medium">
                      {job.postedBy.name?.charAt(0) || "U"}
                    </span>
                  </div>
                  <span>Posted by {job.postedBy.name}</span>
                </div>
                <Link
                  href={`/jobs/${job.id}`}
                  className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {jobs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              No jobs found
            </h3>
            <p className="text-gray-600 mb-8">
              Try adjusting your search criteria or browse all available
              positions
            </p>
            <Link
              href="/jobs"
              className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              View All Jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
