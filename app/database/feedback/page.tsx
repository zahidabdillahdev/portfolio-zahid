import { Metadata } from 'next';
import FeedbackResponsesContent from './content';

export const metadata: Metadata = {
  title: 'Feedback Responses - Zahid',
};

export default function FeedbackResponsesPage() {
  return <FeedbackResponsesContent />;
}
