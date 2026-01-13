import { Metadata } from 'next';
import MoviesDatabase from './content';

export const metadata: Metadata = {
  title: 'Movies - Zahid',
  description: 'Manage movies list',
};

export default async function MoviesPage() {
  return <MoviesDatabase />;
}
