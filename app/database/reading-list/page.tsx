import { Metadata } from 'next';
import ReadingListDatabase from './content';

export const metadata: Metadata = {
  title: 'Reading List - Zahid',
  description: 'A collection of my books',
};

export default async function ReadingListPage() {
  return <ReadingListDatabase />;
}
