import DefaultLayout from "@/components/Layouts/DefaultLaout";
import type { ReactNode } from "react";

const BlogLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DefaultLayout>
      {children}
    </DefaultLayout>
  );
};

export default BlogLayout;
