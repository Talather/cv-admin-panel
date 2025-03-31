// import type { BlogPost } from "@/types/blog";
// import Link from "next/link";
// import DeleteButton from "./DeleteButton";
"use clinet";
import type { BlogPost } from "@/types/blog";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

// type Props = {
//   post: BlogPost;
// };

// export function BlogCard({ post }: Props) {
//   return (
//     <article className="flex flex-col overflow-hidden rounded-lg bg-white text-[4.8vw] shadow-lg transition-shadow md:text-[2.8vw] lg:text-[1.8vw]">
//       <div className="aspect-video overflow-hidden">
//         <img
//           src={post.previewImage ?? "https://images.unsplash.com/photo-1726607424562-62cf93236dd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
//           alt={post.title}
//           className="h-full w-full object-cover"
//         />
//       </div>
//       {post.status === "draft" ? (
//         <span className="rounded bg-yellow-100 px-2 py-1 text-yellow-800">
//           Draft
//         </span>
//       ) : (
//         <span className="rounded bg-green-100 px-2 py-1 text-green-800">
//           Published
//         </span>
//       )}
//       <div className="flex flex-grow flex-col p-6">
//         <h2 className="mb-[0.5em] text-[0.9em] font-bold">
//           <Link
//             href={`/blog/preview?blogSlug=${post.slug}`}
//             className="hover:text-platformGreen transition-all duration-200"
//           >
//             {post.title}
//           </Link>
//         </h2>
//         <p className="mb-[0.5em] flex-grow text-[0.7em] text-gray-600">
//           {post.description}
//         </p>
//         <div className="flex items-center text-gray-500">
//           <span className="text-[0.5em] font-medium">{post.author}</span>
//           <span className="mx-[0.3em] text-[0.5em]">•</span>
//           {/* <time className="text-[0.5em]">{Date(createdAt)}</time> */}
//         </div>
//       </div>
// <div>
//   <Link
//     href={`/blog/form?blogSlug=${post.slug}`}
//     className="text-blue-500"
//   >
//     Edit
//   </Link>
//   <DeleteButton slug={post.slug} />
//   <Link href={`/blog/${post.slug}`} className="text-gray-500">
//     Preview
//   </Link>
// </div>
//     </article>
//   );
// }

type Props = {
  blog: BlogPost;
};

const BlogCard: React.FC<Props> = ({ blog }) => {
  const getStatusStyles = () => {
    switch (blog.status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="animate-fade-in group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent" />
        <img
          src={
            blog.previewImage ??
            "https://images.unsplash.com/photo-1742387436246-b432a6bfc623?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={blog.title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Category Tag */}
        {/* <span className="absolute left-4 top-4 z-20 rounded-full bg-white/90 px-3 py-1 text-xs font-medium backdrop-blur-sm">
          {blog.category}
        </span> */}

        <span
          className={`absolute right-4 top-4 z-20 rounded-full px-3 py-1 text-xs font-medium ${getStatusStyles()}`}
        >
          {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
        </span>
      </div>

      <div className="p-6">
        <h3 className="mb-3 line-clamp-2 text-xl font-semibold tracking-tight text-gray-900">
          {blog.title}
        </h3>

        <p className="mb-4 line-clamp-2 text-gray-600">{blog.description}</p>

        <div className="mb-4 flex items-center gap-2">
          <div className="flex items-center ">
            <span className="text-sm font-medium">{blog.author}</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-slate-300" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {formatDate(`${blog.createdAt}`)}
            </span>
            {/* <span className="text-sm text-gray-500">{blog.readTime} min read</span> */}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex md:flex-col xl:flex-row flex-grow items-center justify-between">
          <Link
            href={`/blog/form?blogSlug=${blog.slug}`}
            className="mb-2 w-full text-center me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            Edit
          </Link>
          <Link
            href={`/articles/preview/${blog.slug}`}
            className="mb-2 me-2 w-full text-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Preview
          </Link>
          <DeleteButton slug={blog.slug} />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
