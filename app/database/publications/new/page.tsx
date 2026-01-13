import { Metadata } from 'next';
import NewPublicationContent from './content';

export const metadata: Metadata = {
  title: 'Add Publication - Zahid',
  description: 'Add a new publication',
};

export default function NewPublicationPage() {
  return <NewPublicationContent />;
}
