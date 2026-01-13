import { Metadata } from 'next';
import Home from './home';

export const metadata: Metadata = {
  title: 'Home - Zahid',
  description: 'Personal website and portfolio of Zahid',
};

export default function HomePage() {
  return <Home />;
}
