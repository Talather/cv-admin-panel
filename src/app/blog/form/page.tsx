"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Editor from "@/components/Editor";
import { getBlogDoc, setBlogDoc, uploadImage } from "@/lib/blog/firebase";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { type BlogPostFormValues, blogPostSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CreateBlogPost() {
  const router = useRouter();
  const [content, setContent] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isImageUploading, setIsImageUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      slug: "",
      status: "draft",
      content: "",
      previewImage: "",
    },
  });

  const onSubmit = async (data: BlogPostFormValues) => {
    try {
      if (!content) {
        toast.error("Content is required");
        return;
      }

      const newPost = {
        ...data,
        content,
        previewImage: previewImage || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setBlogDoc(getBlogDoc(data.slug), newPost);
      toast.success("Blog post saved");
      router.push("/blog");
    } catch (err) {
      console.error(err);
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

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            defaultValue="draft"
            onChange={(e) =>
              setValue("status", e.target.value as "draft" | "published")
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            placeholder="Title"
            {...register("title")}
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroke dark dark:bg-form-input dark:focus:border-primary"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label
            htmlFor="slug"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Slug
          </label>
          <input
            id="slug"
            placeholder="Slug (URL-friendly identifier)"
            {...register("slug")}
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroke dark dark:bg-form-input dark:focus:border-primary"
          />
          {errors.slug && (
            <p className="mt-1 text-sm text-red-500">{errors.slug.message}</p>
          )}
        </div>

        {/* Preview Image Upload */}
        <div>
          <label
            htmlFor="previewImage"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Preview Image
          </label>
          <input
            id="previewImage"
            type="file"
            accept="image/*"
            onChange={handlePreviewImageChange}
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroke dark dark:bg-form-input dark:focus:border-primary"
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
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroke dark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          ) : null}
        </div>

        {/* Editor Content */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Content
          </label>
          <Editor content={content} onChange={(value)=>{
            setValue('content',value)
          }} />
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
