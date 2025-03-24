import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import { Suspense } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { blogPostsCollection } from "@/lib/blog/firebase";
import type { BlogPost } from "@/types/blog";

async function BlogList() {
  const snapshot = await getDocs(blogPostsCollection);
  const posts: BlogPost = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate(),
  }));

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="rounded border p-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold">{post.title}</h2>
              <div className="mt-1 text-sm text-gray-500">
                {post.status === "draft" ? (
                  <span className="rounded bg-yellow-100 px-2 py-1 text-yellow-800">
                    Draft
                  </span>
                ) : (
                  <span className="rounded bg-green-100 px-2 py-1 text-green-800">
                    Published
                  </span>
                )}
              </div>
            </div>
            <div className="mt-2 flex gap-4">
              <Link href={`/admin/edit/${post.slug}`} className="text-blue-500">
                Edit
              </Link>
              <button className="text-red-500">Delete</button>
              <Link href={`/blog/${post.slug}`} className="text-gray-500">
                Preview
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl p-4">
        <h1 className="mb-4 text-2xl font-bold">Blog Posts</h1>
        <Link
          href="/blog/form"
          className="mb-4 inline-block rounded bg-green-500 px-4 py-2 text-white"
        >
          Create New Post
        </Link>

        <Suspense fallback={<BeatLoader size={10} className="mt-4" />}>
          <BlogList />
        </Suspense>
      </div>
    </>
  );
}
