"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Editor from "@/components/Editor";
import {
  getBlogDoc,
  setBlogDoc,
  updateBlogPost,
  uploadImage,
} from "@/lib/blog/firebase";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { type BlogPostFormValues, blogPostSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDoc } from "firebase/firestore";
import type { BlogPost } from "@/types/blog";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function BlogPostForm({ blogPost }: { blogPost?: BlogPost }) {
  const router = useRouter();
  const {isAuthenticated} = useAuth();
  const [content, setContent] = useState<string>(blogPost?.content ?? "");
  const [previewImage, setPreviewImage] = useState<string>(
    blogPost?.previewImage ?? "",
  );
  const [isImageUploading, setIsImageUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: blogPost?.title ?? "",
      slug: blogPost?.slug ?? "",
      category: blogPost?.category ?? "",
      author: blogPost?.author ?? "",
      status: blogPost?.status ?? "draft",
      readTime: blogPost?.readTime ?? "",
      description: blogPost?.description ?? "",
      content: blogPost?.content ?? "",
      previewImage: blogPost?.previewImage ?? "",
    },
  });

  const onSubmit = async (data: BlogPostFormValues) => {
    try {
      if(!isAuthenticated){
        toast.error("Login to create blog");
        return;
      }
      if (!content) {
        toast.error("Content is required");
        return;
      }

      if (blogPost) {
        await updateBlogPost(blogPost.slug, {
          ...data,
          content,
          previewImage: previewImage || null,
          createdAt: blogPost.createdAt || new Date(),
          updatedAt: new Date(),
        });
        toast.success("Blog post updated");
      } else {
        const docRef = getBlogDoc(data.slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          toast.error(
            "A blog post with this slug already exists. Please choose a different slug.",
          );
          return;
        }
        const newPost = {
          ...data,
          content,
          previewImage: previewImage || null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        // @ts-expect-error: err
        await setBlogDoc(docRef, newPost);
        toast.success("Blog post saved");
      }
      router.push("/blog");
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        return toast.error(err.message);
      }
      toast.error("Failed to save post");
    }
  };

  const handlePreviewImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsImageUploading(true);
      const url = await uploadImage(file);
      setPreviewImage(url);
      setValue("previewImage", url);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload preview image");
    } finally {
      setIsImageUploading(false);
    }
  };

  console.log(previewImage);

  return (
    <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card ">
      <div className="rounded-[10px] bg-white p-6 pl-0 dark:bg-gray-dark md:p-8  md:pl-0">
        {/* Back Button and Mode Indicator */}
        <div className="mb-6 flex items-center">
          <button
            type="button"
            onClick={() => router.push("/blog")}
            className="mr-4 rounded-full bg-slate-200 p-2 text-gray-600 transition-colors hover:bg-slate-300 hover:text-gray-900 dark:bg-slate-600  dark:text-gray-200 dark:hover:bg-slate-700 dark:hover:text-gray-400"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              {blogPost ? "Edit Blog Post" : "Create New Blog Post"}
            </h1>
            <p className="pl-1 text-sm text-gray-600 dark:text-gray-400">
              {blogPost
                ? `Editing post: ${blogPost.title}`
                : "Write a new blog post to share your thoughts"}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="my-2 block text-sm font-medium text-gray-700 dark:text-white"
          >
            Status
          </label>
          <select
            id="status"
            defaultValue="draft"
            onChange={(e) =>
              setValue("status", e.target.value as "draft" | "published")
            }
            className="dark:border-form-stroke dark:bg-form-input dark w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:focus:border-primary"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="my-2 block text-sm font-medium text-gray-700 dark:text-white"
          >
            Category
          </label>
          <select
            id="category"
            onChange={(e) => setValue("category", e.target.value)}
            className="dark:border-form-stroke dark:bg-form-input dark w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:focus:border-primary"
          >
            <option value="job-search">Job Search</option>
            <option value="job-interviews">Job Interviews</option>
            <option value="career-advice">Career Advice</option>
            <option value="resume-help">Resume Help</option>
            <option value="cv-help">CV Help</option>
            <option value="cover-letter-help">Cover Letter Help</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
          >
            Title
          </label>
          <input
            id="title"
            placeholder="Title"
            {...register("title")}
            className="dark:border-form-stroke dark:bg-form-input dark w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:focus:border-primary"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description"
            {...register("description")}
            className="dark:border-form-stroke dark:bg-form-input dark w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:focus:border-primary"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label
            htmlFor="slug"
            className="mb-2 block text-sm font-medium text-gray-700  dark:text-white"
          >
            Slug (Used for URL)
          </label>
          <input
            // disabled={!!blogPost?.id}
            id="slug"
            placeholder="Slug (URL-friendly identifier)"
            {...register("slug")}
            className={`dark:border-form-stroke dark:bg-form-input dark w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:focus:border-primary ${"disabled:cursor-not-allowed disabled:bg-slate-200"}`}
          />
          {errors.slug && (
            <p className="mt-1 text-sm text-red-500">{errors.slug.message}</p>
          )}
        </div>

        {/* Author */}
        <div>
          <label
            htmlFor="author"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
          >
            Author
          </label>
          <input
            id="author"
            placeholder="Author"
            {...register("author")}
            className="dark:border-form-stroke dark:bg-form-input dark w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:focus:border-primary"
          />
          {errors.author && (
            <p className="mt-1 text-sm text-red-500">{errors.author.message}</p>
          )}
        </div>

        {/* Read Time */}
        <div>
          <label
            htmlFor="read-time"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
          >
            Read Time
          </label>
          <input
            id="read-time"
            placeholder="20"
            {...register("readTime")}
            className="dark:border-form-stroke dark:bg-form-input dark w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:focus:border-primary"
          />
          {errors.readTime && (
            <p className="mt-1 text-sm text-red-500">{errors.readTime.message}</p>
          )}
        </div>

        {/* Preview Image Upload */}
        <div>
          <label
            htmlFor="previewImage"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
          >
            Preview Image
          </label>
          <input
            id="previewImage"
            type="file"
            accept="image/*"
            onChange={handlePreviewImageChange}
            className="dark:border-form-stroke dark:bg-form-input dark w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:focus:border-primary"
          />
          {isImageUploading ? (
            <div className="mt-2">
              <BeatLoader size={8} color="#000" />
            </div>
          ) : previewImage ? (
            <div className="mt-2">
              <img
                src={previewImage}
                alt="Preview"
                className="dark:border-form-stroke dark:bg-form-input dark w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:focus:border-primary"
              />
            </div>
          ) : null}
        </div>

        {/* Editor Content */}
        <div>
          <label
            htmlFor="content"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
          >
            Content
          </label>
          <Editor
            content={content}
            onChange={(value) => {
              setValue("content", value);
              setContent(value);
            }}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-500">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow transition-colors hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? <BeatLoader size={8} color="#fff" /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
