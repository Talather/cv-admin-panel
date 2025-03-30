import { db, storage } from "../firebase";
import {
  doc,
  collection,
  setDoc as firebaseSetDoc,
  getDoc,
  getDocs,
  type DocumentReference,
  type DocumentData,
  deleteDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import type { BlogPost } from "@/types/blog";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export const blogPostsCollection = collection(db, "blogPosts");

export function getBlogDoc(slug: string): DocumentReference<DocumentData> {
  return doc(blogPostsCollection, slug);
}

export async function setBlogDoc(
  docRef: DocumentReference<BlogPost>,
  data: BlogPost,
): Promise<void> {
  return firebaseSetDoc(docRef, data);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const docRef = getBlogDoc(slug);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? (snapshot.data() as BlogPost) : null;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const snapshot = await getDocs(blogPostsCollection);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as BlogPost[];
}

export const uploadImage = async (file: File) => {
  const storageRef = ref(storage, `blog-images/${Date.now()}-${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

export const deleteImage = async (url: string) => {
  const imageRef = ref(storage, url);
  await deleteObject(imageRef);
};

export const deleteBlogPost = async (slug: string) => {
  const docSnap = await getDoc(getBlogDoc(slug));
  if (docSnap.exists()) {
    const post = docSnap.data();
    const images = post.content.match(/src="([^"]*)"/g) || [];
    await Promise.all(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      images.map(async (img: { match: (arg0: RegExp) => any[]; }) => {
        const url = img.match(/src="(.*?)"/)[1];
        await deleteImage(url);
      }),
    );
    await deleteDoc(getBlogDoc(slug));
  }
};

export const updateBlogPost = async (
  originalSlug: string,
  updatedPost: Partial<BlogPost>,
) => {
  if (originalSlug !== updatedPost.slug) {
    const newDocRef = doc(blogPostsCollection, updatedPost.slug);
    const newDocSnap = await getDoc(newDocRef);
    if (newDocSnap.exists()) {
      throw new Error(
        "A blog post with the new slug already exists. Please choose a different slug.",
      );
    }

    await setDoc(newDocRef, {
      ...updatedPost,
      createdAt: updatedPost.createdAt,
      updatedAt: new Date(),
    });
    await deleteDoc(getBlogDoc(originalSlug));
  } else {
    await updateDoc(getBlogDoc(originalSlug), {
      ...updatedPost,
      updatedAt: new Date(),
    });
  }
};
