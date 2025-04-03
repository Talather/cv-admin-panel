"use client";

import { useRouter } from "next/navigation";

const CreateBlog = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        router.push("/blog/form");
      }}
      className="mb-2 me-2 w-full rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 md:w-fit"
    >
      Create Blog
    </button>
  );
};

export default CreateBlog;
