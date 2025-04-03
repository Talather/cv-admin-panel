import DefaultLayout from "@/components/Layouts/DefaultLaout";
import type { ReactNode } from "react";

export const revalidate = 0;

const BlogLayout = ({ children }: { children: ReactNode }) => {
  return <DefaultLayout>{children}</DefaultLayout>;
};

export default BlogLayout;
