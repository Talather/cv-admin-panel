export interface BlogPost {
  id?: string;
  title: string;
  description: string;
  content: string;
  category: string;
  slug: string;
  readTime: string;
  author?: string;
  createdAt?: Date;
  updatedAt?: Date;
  previewImage?: string | null;
  status: "draft" | "published";
}
