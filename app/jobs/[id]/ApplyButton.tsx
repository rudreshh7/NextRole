"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ApplyButton({ jobId }: { jobId: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [applicationStatus, setApplicationStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleApply = async () => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    setErrorMessage("");
    setApplicationStatus("idle");

    try {
      await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
      });
      setApplicationStatus("success");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to apply for the job");
      }
      setApplicationStatus("error");
    }
  };

  if (status === "loading") {
    return (
      <button
        disabled
        className="w-full bg-gray-300 text-gray-500 px-8 py-3 rounded-lg font-medium cursor-not-allowed flex items-center justify-center"
      >
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent mr-2"></div>
        Loading...
      </button>
    );
  }

  if (applicationStatus === "success") {
    return (
      <div className="text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Application Submitted!
          </h3>
          <p className="text-green-600 text-sm mb-4">
            Your application has been successfully submitted. The hiring team
            will review it shortly.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            View Applications
          </Link>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="space-y-4">
        <p className="text-gray-600 text-center text-sm">
          Sign in to apply for this position
        </p>
        <Link
          href="/auth/signin"
          className="w-full bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
        >
          Sign In to Apply
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleApply}
        className="w-full bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
      >
        Apply for this Position
      </button>

      {applicationStatus === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-red-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="text-center">
        <p className="text-gray-500 text-xs">
          By applying, you agree to our terms and conditions
        </p>
      </div>
    </div>
  );
}
