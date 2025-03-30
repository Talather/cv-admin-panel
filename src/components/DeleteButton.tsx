"use client";
import { useState } from "react";
import DeleteModal from "@/components/DeleteModal";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { deleteBlogPost } from "@/lib/blog/firebase";
import toast from "react-hot-toast";

export default function DeleteButton({ slug }: { slug: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteBlogPost(slug);
      router.refresh();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Unable to delete selected blog post");
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="mb-2 w-full text-center me-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Delete
      </button>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />

      {isDeleting && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
          <BeatLoader color="#ffffff" />
        </div>
      )}
    </>
  );
}
