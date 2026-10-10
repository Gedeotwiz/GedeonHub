import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { isSessionTokenValid, SESSION_COOKIE } from '../auth';
import DashboardLayout from '../components/dashboard-layout';
import { DashboardProvider } from '../components/dashboard-provider';

export default async function AuthenticatedDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!isSessionTokenValid(token)) redirect('/blogs/login');

  return (
    <DashboardProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </DashboardProvider>
  );
}
