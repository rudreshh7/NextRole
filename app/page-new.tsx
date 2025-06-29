import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const recentJobs = await prisma.job.findMany({
    take: 6,
    orderBy: {
      postedAt: "desc",
    },
    include: {
      postedBy: {
        select: {
          name: true,
        },
      },
    },
  });

  const jobStats = await prisma.job.aggregate({
    _count: {
      id: true,
    },
  });

  const userStats = await prisma.user.aggregate({
    _count: {
      id: true,
    },
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                Where talent meets
                <span className="block text-gray-400">opportunity</span>
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Connect with the world&apos;s most innovative companies and
                unlock your potential
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link
                href="/jobs"
                className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200"
              >
                Browse Jobs
              </Link>
              <Link
                href="/jobs/post"
                className="border border-gray-200 hover:border-gray-300 text-gray-900 px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200 hover:bg-gray-50"
              >
                Post a Job
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {jobStats._count.id}+
                </div>
                <div className="text-gray-600">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {userStats._count.id}+
                </div>
                <div className="text-gray-600">Professionals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  500+
                </div>
                <div className="text-gray-600">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  98%
                </div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Built for modern hiring
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to find your next role or hire top talent
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Apply to jobs in seconds with our streamlined application
                process
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Verified Companies
              </h3>
              <p className="text-gray-600">
                All companies are verified and vetted for quality and legitimacy
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Smart Matching
              </h3>
              <p className="text-gray-600">
                Get matched with relevant opportunities based on your skills and
                preferences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Jobs Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              Latest opportunities
            </h2>
            <p className="text-xl text-gray-600">
              Fresh jobs from top companies, updated daily
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-gray-100 hover:border-gray-200 p-6 rounded-2xl transition-colors duration-200 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-900 font-semibold text-lg">
                      {job.company.charAt(0)}
                    </span>
                  </div>
                  <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {job.title}
                </h3>
                <p className="text-gray-600 font-medium mb-3">{job.company}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-4">{job.location}</span>
                  {job.salary && <span>{job.salary}</span>}
                </div>
                <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
                  {job.description}
                </p>
                <Link
                  href={`/jobs/${job.id}`}
                  className="inline-flex items-center text-gray-900 hover:text-gray-700 font-medium text-sm transition-colors duration-200"
                >
                  View Details
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/jobs"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200"
            >
              View All Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Join thousands of professionals who&apos;ve found their dream jobs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signin"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200"
            >
              Get Started
            </Link>
            <Link
              href="/jobs"
              className="border border-gray-200 hover:border-gray-300 text-gray-900 px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200 hover:bg-white"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
