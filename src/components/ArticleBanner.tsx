import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import type { Timestamp } from "firebase/firestore";

type Props = {
  title: string;
  description: string;
  category: string;
  slug: string;
  author?: string;
  readTime?: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
};

export default function ArticleBanner({
  title,
  description,
  category,
  slug,
  author,
  readTime,
  createdAt,
  updatedAt,
}: Props) {
  return (
    <section className="w-full pt-8  mx-auto bg-gradient-to-b from-[#30d0ad]/20 to-[#fff]  py-10">
      <div className="  mx-auto px-2 md:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="font-medium">
          <div className="flex flex-wrap items-center  text-black">
            <Link href="/blog" className="hover:underline text-platformGreen">
              Home
            </Link>
            <span className="mx-2">&gt;</span>
            <Link href="/blog" className="hover:underline text-platformGreen">
              Blog
            </Link>
            <span className="mx-2">&gt;</span>
            <Link href={"blog"} className="capitalize text-platformGreen hover:underline">
              {category?.replace(/-/g, " ")}
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="font-normal text-gray-700">{title}</span>
          </div>
        </nav>

        <div className="grid items-center gap-14 lg:grid-cols-3">
          {/* Left side - Title and content */}
          <div className="space-y-6 md:col-span-2">
            {/* Title */}
            <h1  className="text-3xl font-bold leading-[40px] mt-3 md:mt-0 md:leading-[60px] text-gray-700 sm:text-4xl md:text-5xl">
              {title}
            </h1>

            {/* Subheadline */}
            <p className="md:text-xl text-lg text-gray-700/90">{description}</p>

            {/* Divider */}
            <hr className="border-[#30d0ad]/50"/>

            {/* Author and Date Section */}
            <div className="flex items-center md:text-xl text-lg ">
              <div className="space-y-0.5">
                <p className="text-gray-700/90">
                  Written by <span className="font-medium">OptimCV Career Team</span>
                </p>
                <p className="text-gray-700/80">
                  Published on{" "}
                  <span className="font-medium">
                    {format(`${updatedAt?.toDate()}`, "dd MMMM yyyy")}
                  </span>
                </p>
                <p className="mt-1 text-gray-700/80">{readTime} min read</p>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="hidden lg:block">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Cover Letter Writing"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
