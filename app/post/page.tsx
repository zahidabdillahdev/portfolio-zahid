import { Metadata } from 'next';
import PostsContent from './content';

export const metadata: Metadata = {
  title: 'Posts - Zahid',
  description: 'Browse all posts on Zahid',
};

export default function PostsPage() {
  return <PostsContent />;
}
