import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Search,
  CheckCircle,
  Target,
  Users,
  Zap,
  TrendingUp,
  Star,
  Shield,
  ArrowRight,
} from "lucide-react";

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
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gray-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gray-100 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
              <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4 mr-2 text-black" />
              Trusted by 50,000+ professionals worldwide
            </div>

            {/* Main Headline */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight">
                Your dream job
                <span className="block bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent">
                  awaits you
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
                Join the world&apos;s most innovative companies. Discover
                opportunities that align with your passion, skills, and career
                goals.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
                <div className="relative">
                  <div className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-lg border border-gray-200 p-2 gap-2 sm:gap-0">
                    <input
                      type="text"
                      placeholder="Job title, company, or keywords..."
                      className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg text-gray-900 placeholder-gray-500 bg-transparent focus:outline-none rounded-xl sm:rounded-none"
                    />
                    <button className="bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center">
                      <Search className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                      Search
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center mt-4 space-x-2 sm:space-x-6 text-xs sm:text-sm text-gray-500">
                  <span className="mb-2 sm:mb-0">Popular searches:</span>
                  <button className="hover:text-gray-700 transition-colors mb-2 sm:mb-0">
                    Software Engineer
                  </button>
                  <button className="hover:text-gray-700 transition-colors mb-2 sm:mb-0">
                    Product Manager
                  </button>
                  <button className="hover:text-gray-700 transition-colors mb-2 sm:mb-0">
                    Designer
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4">
              <Link
                href="/jobs"
                className="group bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-200 flex items-center justify-center"
              >
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                Explore Opportunities
              </Link>
              <Link
                href="/jobs/post"
                className="group border-2 border-gray-200 hover:border-gray-300 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-200 hover:bg-gray-50 flex items-center justify-center"
              >
                <Target className="w-4 sm:w-5 h-4 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
                Post a Job
              </Link>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto px-4">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {jobStats._count.id}+
                </div>
                <div className="text-gray-600 font-medium">Active Jobs</div>
                <div className="text-sm text-green-600 mt-1">
                  ↗ +25% this month
                </div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {userStats._count.id}+
                </div>
                <div className="text-gray-600 font-medium">Professionals</div>
                <div className="text-sm text-blue-600 mt-1">Growing daily</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  500+
                </div>
                <div className="text-gray-600 font-medium">Top Companies</div>
                <div className="text-sm text-purple-600 mt-1">Fortune 500</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  98%
                </div>
                <div className="text-gray-600 font-medium">Success Rate</div>
                <div className="text-sm text-orange-600 mt-1">
                  Industry leading
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              Built for modern hiring
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Everything you need to find your next role or hire top talent
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors duration-200">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-gray-900" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Lightning Fast
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Apply to jobs in seconds with our streamlined application
                process
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors duration-200">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <Shield className="w-5 sm:w-6 h-5 sm:h-6 text-gray-900" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Verified Companies
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                All companies are verified and vetted for quality and legitimacy
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors duration-200 sm:col-span-2 lg:col-span-1">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <Target className="w-5 sm:w-6 h-5 sm:h-6 text-gray-900" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Smart Matching
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Get matched with relevant opportunities based on your skills and
                preferences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Jobs Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              Latest opportunities
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">
              Fresh jobs from top companies, updated daily
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-gray-100 hover:border-gray-200 p-4 sm:p-6 rounded-xl sm:rounded-2xl transition-colors duration-200 group"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-900 font-semibold text-base sm:text-lg">
                      {job.company.charAt(0)}
                    </span>
                  </div>
                  <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 sm:px-2.5 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {job.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 font-medium mb-3">
                  {job.company}
                </p>
                <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
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
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link
              href="/jobs"
              className="bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium transition-colors duration-200 inline-block"
            >
              View All Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted Companies Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-8">
              Trusted by leading companies worldwide
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">Google</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">
                  Microsoft
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">Apple</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">Amazon</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">Netflix</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">Spotify</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              How it works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get hired in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Create Your Profile
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sign up and create a compelling profile that showcases your
                skills, experience, and achievements to stand out to employers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Find Perfect Jobs
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Browse through thousands of curated job opportunities or get
                matched with positions that align with your skills and
                preferences.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Get Hired
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Apply with one click and connect directly with hiring managers.
                Our streamlined process gets you from application to offer
                faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              What our users say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from professionals who have transformed their careers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-gray-900 font-semibold">S</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Sarah Chen
                    </div>
                    <div className="text-gray-600 text-sm">
                      Software Engineer at Google
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  &ldquo;This platform helped me find my dream job at a top tech
                  company. The process was fast and the support team was
                  incredibly helpful!&rdquo;
                </p>
              </div>
              <div className="flex text-yellow-400">
                <span>★★★★★</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-gray-900 font-semibold">M</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Marcus Johnson
                    </div>
                    <div className="text-gray-600 text-sm">Startup Founder</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  &ldquo;I was able to hire a fantastic developer for my team
                  within weeks! The quality of candidates is outstanding.&rdquo;
                </p>
              </div>
              <div className="flex text-yellow-400">
                <span>★★★★★</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-gray-900 font-semibold">A</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Anna Rodriguez
                    </div>
                    <div className="text-gray-600 text-sm">
                      UX Designer at Netflix
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  &ldquo;As a designer, finding the right job can be
                  challenging. This platform connected me with amazing
                  opportunities that fit my profile.&rdquo;
                </p>
              </div>
              <div className="flex text-yellow-400">
                <span>★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Advanced features for modern professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools and insights to accelerate your career growth
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      AI-Powered Matching
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our intelligent algorithm matches you with jobs that
                      perfectly align with your skills, experience, and career
                      goals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Career Analytics
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Get detailed insights into your career progression, market
                      trends, and salary benchmarks to make informed decisions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Skill Development
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Access curated learning resources and skill assessments to
                      continuously improve and stay competitive in your field.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">
                      Profile Optimization
                    </span>
                  </div>
                  <span className="text-green-600 font-semibold">95%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">
                      Job Match Score
                    </span>
                  </div>
                  <span className="text-blue-600 font-semibold">92%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">
                      Application Success
                    </span>
                  </div>
                  <span className="text-purple-600 font-semibold">89%</span>
                </div>
                <div className="p-4 bg-black rounded-lg text-white">
                  <div className="text-sm text-gray-300 mb-1">
                    Next career milestone
                  </div>
                  <div className="text-lg font-semibold">
                    Senior Developer Role
                  </div>
                  <div className="text-sm text-gray-300 mt-2">
                    3 matching opportunities available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Insights Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Industry insights & trends
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay ahead with real-time market data and career insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">$125K</div>
              <div className="text-gray-600 text-sm mb-4">
                Average Tech Salary
              </div>
              <div className="text-green-600 text-sm font-medium">
                ↗ +12% this year
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">85%</div>
              <div className="text-gray-600 text-sm mb-4">
                Remote Work Growth
              </div>
              <div className="text-blue-600 text-sm font-medium">
                ↗ Growing trend
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">3.2M</div>
              <div className="text-gray-600 text-sm mb-4">Job Openings</div>
              <div className="text-purple-600 text-sm font-medium">
                ↗ +25% monthly
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                14 days
              </div>
              <div className="text-gray-600 text-sm mb-4">
                Average Hiring Time
              </div>
              <div className="text-orange-600 text-sm font-medium">
                ↓ 40% faster
              </div>
            </div>
          </div>

          <div className="mt-16 bg-white p-8 rounded-2xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Most in-demand skills right now
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">React & Next.js</span>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full mr-3">
                        <div className="w-20 h-2 bg-black rounded-full"></div>
                      </div>
                      <span className="text-sm text-gray-600">95%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Python & AI/ML</span>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full mr-3">
                        <div className="w-18 h-2 bg-black rounded-full"></div>
                      </div>
                      <span className="text-sm text-gray-600">88%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Cloud Architecture</span>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full mr-3">
                        <div className="w-16 h-2 bg-black rounded-full"></div>
                      </div>
                      <span className="text-sm text-gray-600">82%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">DevOps & Automation</span>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full mr-3">
                        <div className="w-14 h-2 bg-black rounded-full"></div>
                      </div>
                      <span className="text-sm text-gray-600">76%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Top hiring locations
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">1</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        San Francisco Bay Area
                      </div>
                      <div className="text-sm text-gray-600">
                        12,500+ openings
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">2</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        New York City
                      </div>
                      <div className="text-sm text-gray-600">
                        9,800+ openings
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">3</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Seattle</div>
                      <div className="text-sm text-gray-600">
                        7,200+ openings
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">4</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Remote Worldwide
                      </div>
                      <div className="text-sm text-gray-600">
                        15,600+ openings
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community & Resources Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Join our thriving community
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with like-minded professionals, share insights, and
                accelerate your career growth together.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Weekly Career Insights
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Get the latest industry trends and career advice
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Networking Events
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Connect with professionals in your field
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Skill Development
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Access free courses and learning resources
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Stay ahead of the curve
                </h3>
                <p className="text-gray-600">
                  Get weekly insights, job alerts, and career tips delivered to
                  your inbox
                </p>
              </div>

              <form className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
                <div>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900">
                    <option>Select your field</option>
                    <option>Software Development</option>
                    <option>Data Science</option>
                    <option>Product Management</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                    <option>Other</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Join Community
                </button>
              </form>

              <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span>Join 50,000+ professionals</span>
                <span>•</span>
                <span>No spam, unsubscribe anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            Ready to get started?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 px-4">
            Join thousands of professionals who&apos;ve found their dream jobs
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/auth/signin"
              className="bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium transition-colors duration-200"
            >
              Get Started
            </Link>
            <Link
              href="/jobs"
              className="border border-gray-200 hover:border-gray-300 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium transition-colors duration-200 hover:bg-white"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
