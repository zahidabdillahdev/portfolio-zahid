import { Metadata } from 'next';
import AnalyticsContent from './content';

export const metadata: Metadata = {
  title: 'Analytics - Zahid',
};

export default function DashboardPage() {
  return <AnalyticsContent />;
}
