import { Metadata } from 'next';
import LoginContent from './content';

export const metadata: Metadata = {
  title: 'Login - Zahid',
};

export default function DashboardPage() {
  return <LoginContent />;
}
