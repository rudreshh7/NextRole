"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { logout } from "@/lib/auth";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex">
            <Link href="/" className="flex items-center group">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:scale-105 transition-all duration-200">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="ml-2.5 text-lg font-semibold text-gray-900">
                TalentForge
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/jobs"
              className="text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50"
            >
              Browse Jobs
            </Link>
            {status === "loading" ? (
              <div className="px-3 py-1.5">
                <div className="w-16 h-5 bg-gray-200 animate-pulse rounded"></div>
              </div>
            ) : session ? (
              <>
                <Link
                  href="/jobs/post"
                  className="text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50"
                >
                  Post Job
                </Link>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50"
                >
                  Dashboard
                </Link>
                <div className="w-px h-4 bg-gray-300 mx-2"></div>
                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 active:bg-gray-100"
                >
                  Sign Out
                </button>
              </>
            ) : (
              // Show Sign In button when not authenticated or loading failed
              <Link
                href="/auth/signin"
                className="bg-black hover:bg-gray-800 active:bg-gray-900 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 ml-3"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-md transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              <Link
                href="/jobs"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Jobs
              </Link>
              {status === "loading" ? (
                <div className="px-3 py-2">
                  <div className="w-16 h-5 bg-gray-200 animate-pulse rounded"></div>
                </div>
              ) : session ? (
                <>
                  <Link
                    href="/jobs/post"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Post Job
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 active:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                // Show Sign In button when not authenticated or loading failed
                <Link
                  href="/auth/signin"
                  className="block mx-3 mt-2 bg-black hover:bg-gray-800 active:bg-gray-900 text-white px-4 py-2 rounded-md text-base font-medium transition-all duration-200 text-center focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
