import { Metadata } from 'next';
import PublicationDatabase from './content';

export const metadata: Metadata = {
  title: 'Publications - Zahid',
  description: 'A collection of my publications',
};

export default async function PublicationPage() {
  return <PublicationDatabase />;
}
