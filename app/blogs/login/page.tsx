import type { Metadata } from 'next';
import { Suspense } from 'react';
import { isAuthConfigured } from '../auth';
import LoginForm from '../login-form';

export const metadata: Metadata = {
  title: 'Sign in | Gedeon Hub',
  robots: { index: false, follow: false },
};

export default function BlogsLoginPage() {
  return <Suspense><LoginForm configured={isAuthConfigured()} /></Suspense>;
}
