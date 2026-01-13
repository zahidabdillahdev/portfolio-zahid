import { Metadata } from 'next';
import CertsContent from './content';

export const metadata: Metadata = {
  title: 'Certificates - Zahid',
  description: 'My licenses and certifications',
};

export default async function CertsPage() {
  return <CertsContent />;
}
