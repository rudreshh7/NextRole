import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import ApplyButton from "./ApplyButton";

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const jobId = (await params).id;

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { postedBy: true },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/jobs"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Jobs
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-8">
              {/* Job Header */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-900 font-semibold text-lg">
                        {job.company.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                        {job.title}
                      </h1>
                      <p className="text-xl text-gray-600 font-medium">
                        {job.company}
                      </p>
                    </div>
                  </div>
                  {job.salary && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {job.salary}
                      </div>
                      <div className="text-gray-500 text-sm">per year</div>
                    </div>
                  )}
                </div>

                {/* Job Meta Info */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                    <span className="text-gray-700 text-sm font-medium">
                      {job.location}
                    </span>
                  </div>
                  <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                    <span className="text-gray-700 text-sm font-medium">
                      {job.type}
                    </span>
                  </div>
                  <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                    <span className="text-gray-700 text-sm font-medium">
                      Remote Friendly
                    </span>
                  </div>
                </div>

                {/* Posted Info */}
                <div className="flex items-center text-gray-500 text-sm border-t border-gray-100 pt-4">
                  <div className="flex items-center mr-6">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-medium">
                        {job.postedBy.name?.charAt(0) || "U"}
                      </span>
                    </div>
                    <span>Posted by {job.postedBy.name}</span>
                  </div>
                  <div>
                    <span>
                      {formatDistanceToNow(new Date(job.postedAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Job Description
                </h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 p-6 rounded-xl border border-gray-100">
                  {job.description}
                </div>
              </div>

              {/* Key Highlights */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Why You&apos;ll Love This Role
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center text-gray-700">
                    <span className="w-1.5 h-1.5 bg-black rounded-full mr-3"></span>
                    Competitive salary package
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-1.5 h-1.5 bg-black rounded-full mr-3"></span>
                    Flexible working hours
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-1.5 h-1.5 bg-black rounded-full mr-3"></span>
                    Professional development
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="w-1.5 h-1.5 bg-black rounded-full mr-3"></span>
                    Health & wellness benefits
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Apply Card */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  Ready to Apply?
                </h3>
                <p className="text-gray-600 text-center mb-6 text-sm">
                  Join this amazing team and take your career to the next level!
                </p>
                <ApplyButton jobId={job.id} />
              </div>

              {/* Company Info */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  About {job.company}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></span>
                    <span>Global presence</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></span>
                    <span>500+ employees</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></span>
                    <span>Fast-growing startup</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Job Insights
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Applications</span>
                    <span className="font-semibold text-gray-900">12+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Rate</span>
                    <span className="font-semibold text-gray-900">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hiring Speed</span>
                    <span className="font-semibold text-gray-900">Fast</span>
                  </div>
                </div>
              </div>

              {/* Share Job */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Share this job
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 rounded-lg transition-colors duration-200 text-center">
                    <svg
                      className="w-5 h-5 mx-auto"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 rounded-lg transition-colors duration-200 text-center">
                    <svg
                      className="w-5 h-5 mx-auto"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 rounded-lg transition-colors duration-200 text-center">
                    <svg
                      className="w-5 h-5 mx-auto"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 rounded-lg transition-colors duration-200 text-center">
                    <svg
                      className="w-5 h-5 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
