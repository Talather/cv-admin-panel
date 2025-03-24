import { db, storage } from '../firebase';
import {
  doc,
  collection,
  setDoc as firebaseSetDoc,
  getDoc,
  getDocs,
type  DocumentReference,
 type DocumentData,
} from 'firebase/firestore';
import type { BlogPost } from '@/types/blog';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const blogPostsCollection = collection(db, 'blogPosts');


export function getBlogDoc(slug: string): DocumentReference<DocumentData> {
  return doc(blogPostsCollection, slug);
}


export async function setBlogDoc(
  docRef: DocumentReference<BlogPost>,
  data: BlogPost
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