import { getBlogDoc } from "@/lib/blog/firebase";
import { getDoc } from "firebase/firestore";
import BlogPostForm from "./blog-form";

const CreateBlogPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) => {
  try {
    const { blogSlug } = await searchParams;
    if (blogSlug) {
      const docRef = getBlogDoc(blogSlug);
      const blogPost = await getDoc(docRef);

      if (blogPost.exists()) {
        return (
          <BlogPostForm
            blogPost={{
              id: blogPost.id,
              readTime:blogPost.data()?.readTime,
              author: blogPost.data()?.author,
              content: blogPost.data()?.content,
              title: blogPost.data()?.title,
              category: blogPost.data()?.category,
              description: blogPost.data().description,
              slug: blogPost.data()?.slug,
              previewImage: blogPost.data()?.previewImage,
              status: blogPost.data()?.status,
            }}
          />
        );
      }
      return <BlogPostForm />;
    }
    return <BlogPostForm />;
  } catch (error) {
    return <h2>Unable to find blog</h2>;
  }
};

export default CreateBlogPage;
