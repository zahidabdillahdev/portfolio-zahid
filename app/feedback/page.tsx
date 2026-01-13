import { Metadata } from 'next';
import FeedbackContent from './content';

export const metadata: Metadata = {
  title: 'Feedback - Zahid',
};

export default function FeedbackPage() {
  return <FeedbackContent />;
}
