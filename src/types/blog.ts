export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  previewImage?: string;
  status: 'draft' | 'published';
}