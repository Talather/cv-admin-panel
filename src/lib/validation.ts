import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

export const blogPostSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  slug: z.string().min(1, { message: 'Slug is required' }),
  status: z.enum(['draft', 'published']),
  content: z.string().min(1, { message: 'Content is required' }),
  previewImage: z.string().optional(),
});

export type BlogPostFormValues  = z.infer<typeof blogPostSchema>;