import { Metadata } from 'next';
import PagesContent from './content';

export const metadata: Metadata = {
  title: 'Pages - Zahid',
};

export default function DashboardPage() {
  return <PagesContent />;
}
