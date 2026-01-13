import { Metadata } from 'next';
import UIComponentsContent from './content';

export const metadata: Metadata = {
  title: 'UI - Zahid',
  description:
    'Explore all available UI components used in this website, in an interactive way.',
};

export default async function UIComponentsPage() {
  return <UIComponentsContent />;
}
