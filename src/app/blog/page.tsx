import { getDocs } from "firebase/firestore";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import { Suspense } from "react";
import { blogPostsCollection } from "@/lib/blog/firebase";
import type { BlogPost } from "@/types/blog";
import BlogCardGrid from "@/components/BlogCardGrid";
import CreateBlog from "@/components/CreateBlog";

async function BlogList() {
  const snapshot = await getDocs(blogPostsCollection);
  const posts: BlogPost[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    description: doc.data().description,
    content: doc.data().content,
    category: doc.data().category,
    slug: doc.data().slug,
    readTime: doc.data().readTime,
    author: doc.data().author,
    previewImage: doc.data().previewImage,
    status: doc.data().status,
    createdAt: doc.data().createdAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate(),
  }));

  if (!posts.length) {
    return (
      <div className="space-y-4 rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <h2>No posts created yet</h2>
      </div>
    );
  }

  return (
    <div className="rounded-[10px]  dark:bg-gray-dark dark:shadow-card">
      {/* {posts.map((post: BlogPost) => (
        <BlogCard key={crypto.randomUUID()} blog={post} />
      ))} */}
      <BlogCardGrid blogs={posts} />
    </div>
  );
}

export default function BlogPage() {
  return (
    <>
      <div className="">
        <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <div className=" text-left">
            <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Blog Management
            </h1>
            <p className="mx-auto  text-lg text-gray-600">
              Manage your blog posts with ease. Create, edit, preview or delete
              your content.
            </p>
          </div>
          <CreateBlog />
        </div>

        <Suspense
          fallback={
            <div className="flex w-full items-center justify-center ">
              <BeatLoader size={10} className="mt-4 " />
            </div>
          }
        >
          <BlogList />
        </Suspense>
      </div>
    </>
  );
}
