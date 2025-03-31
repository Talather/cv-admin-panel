import { getBlogDoc } from "@/lib/blog/firebase";
import { getDoc } from "firebase/firestore";
import ParsedContent from "./parsed-content";
import ArticleBanner from "@/components/ArticleBanner";

export const revalidate = 0;

const BlogPreview = async ({
  params,
}: {
  params: Promise<Record<string, string | undefined>>;
}) => {
  try {
    const { blogSlug } = await params;
    if (blogSlug) {
      const docRef = getBlogDoc(blogSlug);
      const blogPost = await getDoc(docRef);
      const post = blogPost.data();

      if (blogPost.exists()) {
        return (
          <div className="rounded-sm bg-white ">
            <ArticleBanner
              description={post?.description}
              category={post?.category}
              slug={post?.slug}
              readTime={post?.readTime}
              author={post?.author}
              createdAt={post?.createdAt}
              updatedAt={post?.updatedAt}
              title={post?.title}
            />
            <ParsedContent content={post?.content} />
          </div>
        );
      }
      return <h2>Unable to find blog</h2>;
    }
  } catch (error) {
    return <h2>Unable to find blog</h2>;
  }
};

export default BlogPreview;
