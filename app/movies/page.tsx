import { Metadata } from 'next';
import MoviesContent from './content';

export const metadata: Metadata = {
  title: 'Movies - Zahid',
  description: 'My movie list',
};

export default async function MoviesPage() {
  return <MoviesContent />;
}
