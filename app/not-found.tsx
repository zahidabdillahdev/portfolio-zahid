import NotFound from '@/components/NotFound';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zahid - 404 Not Found',
  description: 'The page you are looking for could not be found.',
};

export default function NotFoundPage() {
  return <NotFound />;
}
