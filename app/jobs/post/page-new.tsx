"use client";

import { FormEvent } from "react";

export default function PostJobPage() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      company: formData.get("company"),
      location: formData.get("location"),
      type: formData.get("type"),
      description: formData.get("description"),
      salary: formData.get("salary"),
    };

    try {
      await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      window.location.href = "/jobs";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Post a new role
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with top talent and find your next great hire
          </p>
        </div>

        {/* Form */}
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Company *
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  required
                  placeholder="e.g. TechCorp Inc."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  required
                  placeholder="e.g. San Francisco, CA"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Job Type *
                </label>
                <select
                  name="type"
                  id="type"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900"
                >
                  <option value="">Select job type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Salary (Optional)
              </label>
              <input
                type="text"
                name="salary"
                id="salary"
                placeholder="e.g. $120,000 - $160,000"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Job Description *
              </label>
              <textarea
                name="description"
                id="description"
                rows={8}
                required
                placeholder="Describe the role, responsibilities, requirements, and what makes this opportunity special..."
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 resize-vertical"
              />
              <p className="text-sm text-gray-500 mt-2">
                Be specific about requirements, responsibilities, and company
                culture
              </p>
            </div>

            {/* Tips Section */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                💡 Tips for a great job post
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Write a clear, descriptive job title
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Include specific requirements and qualifications
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Highlight what makes your company unique
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Be transparent about salary and benefits
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200"
              >
                Post Job
              </button>
              <button
                type="button"
                onClick={() => (window.location.href = "/jobs")}
                className="flex-1 border border-gray-200 hover:border-gray-300 text-gray-900 px-8 py-4 rounded-lg font-semibold transition-colors duration-200 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Your job post will be reviewed and published within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}
