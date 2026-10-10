import type { Metadata } from 'next';
import Dashboard from './dashboard';

export const metadata: Metadata = {
  title: 'Blogs Dashboard | Gedeon Hub',
  description: 'Manage photos, documents, contact messages, and profile settings.',
};

export default function BlogsPage() {
  return <Dashboard />;
}
