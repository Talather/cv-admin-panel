"use client";

import type { BlogPost } from "@/types/blog";
import { useState } from "react";
import BlogCard from "./BlogCard";

const BlogCardGrid = ({ blogs }: { blogs: BlogPost[] }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Get unique statuses
  const statuses = [
    "all",
    ...Array.from(new Set(blogs.map((blog) => blog.status))),
  ];

  // Filter blogs based on selected category and status
  const filteredBlogs = blogs.filter((blog) => {
    const statusMatch =
      selectedStatus === "all" || blog.status === selectedStatus;
    return statusMatch;
  });

  return (
    <div className="animate-fade-in  mx-auto  py-12">
      {/* Filters */}
      <div className="mb-10  flex flex-row items-center justify-end gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <label
            htmlFor="status-filter"
            className="text-sm font-medium text-gray-700"
          >
            Status:
          </label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-md border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogCard key={crypto.randomUUID()} blog={blog} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-lg text-gray-500">
              No blogs found matching your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedStatus("all");
              }}
              className="admin-button-outline mt-4"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCardGrid;
