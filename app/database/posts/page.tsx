import { Metadata } from 'next';
import PostDatabase from './content';

export const metadata: Metadata = {
  title: 'Post - Zahid',
  description: 'Browse all posts on Zahid',
};

export default async function PostPage() {
  return <PostDatabase />;
}
