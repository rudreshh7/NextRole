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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                    Be specific about requirements, responsibilities, and
                    company culture
                  </p>
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
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tips Section */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 text-gray-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                Tips for success
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">✓</span>
                  Write a clear, descriptive job title
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">✓</span>
                  Include specific requirements and qualifications
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">✓</span>
                  Highlight what makes your company unique
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">✓</span>
                  Be transparent about salary and benefits
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">✓</span>
                  Use bullet points for easy reading
                </li>
              </ul>
            </div>

            {/* Process Section */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 text-gray-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                What happens next?
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <span className="bg-gray-100 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                    1
                  </span>
                  <div>
                    <div className="font-medium text-gray-900">Review</div>
                    <div>Your job post will be reviewed within 24 hours</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-gray-100 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                    2
                  </span>
                  <div>
                    <div className="font-medium text-gray-900">Go Live</div>
                    <div>
                      Your job will be visible to thousands of candidates
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-gray-100 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                    3
                  </span>
                  <div>
                    <div className="font-medium text-gray-900">
                      Applications
                    </div>
                    <div>Receive and manage applications in your dashboard</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Need help?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Our team is here to help you create the perfect job post.
              </p>
              <a
                href="mailto:support@talentforge.com"
                className="text-sm text-gray-900 hover:text-gray-700 font-medium transition-colors duration-200"
              >
                Contact Support →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
