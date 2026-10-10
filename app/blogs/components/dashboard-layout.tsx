'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  FiArrowUpRight,
  FiBell,
  FiFileText,
  FiGrid,
  FiImage,
  FiLogOut,
  FiMenu,
  FiMessageSquare,
  FiSettings,
  FiX,
} from 'react-icons/fi';
import { useDashboard } from './dashboard-provider';

const navItems = [
  { href: '/blogs/overview', label: 'Overview', icon: FiGrid },
  { href: '/blogs/images', label: 'Images', icon: FiImage },
  { href: '/blogs/documents', label: 'Documents', icon: FiFileText },
  { href: '/blogs/comments', label: 'Contact messages', icon: FiMessageSquare },
  { href: '/blogs/settings', label: 'Settings', icon: FiSettings },
];

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { messages, profile, notice, error, setError, setNotice } = useDashboard();
  const title = navItems.find((item) => item.href === pathname)?.label ?? 'Overview';

  const logout = async () => {
    setLoggingOut(true);
    try {
      const response = await fetch('/api/blogs/auth', { method: 'DELETE' });
      if (!response.ok) throw new Error('Logout failed.');
      router.replace('/blogs/login');
      router.refresh();
    } catch {
      setError('Could not log out. Please try again.');
      setLoggingOut(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7fa] text-slate-900">
      <div className="flex min-h-screen">
        {sidebarOpen && <button aria-label="Close navigation menu" className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
        <aside className={`fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col bg-[#142b40] px-5 py-6 text-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between px-2">
            <Link href="/" className="flex items-center gap-3" aria-label="Gedeon Hub home">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e3ad28] text-sm font-black text-[#142b40]">G</span>
              <span><span className="block text-sm font-bold tracking-wide">GEDEON HUB</span><span className="mt-0.5 block text-xs text-slate-400">Creator dashboard</span></span>
            </Link>
            <button className="rounded-lg p-2 text-slate-300 hover:bg-white/10 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close menu"><FiX size={20} /></button>
          </div>
          <p className="mb-3 mt-10 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Workspace</p>
          <nav className="space-y-1" aria-label="Dashboard sections">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return <Link key={href} href={href} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${active ? 'bg-[#e3ad28] text-[#142b40] shadow-sm' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}><Icon size={18} aria-hidden="true" />{label}{href === '/blogs/comments' && messages.length > 0 && <span className={`ml-auto rounded-full px-2 py-0.5 text-xs ${active ? 'bg-[#142b40]/10' : 'bg-white/10'}`}>{messages.length}</span>}</Link>;
            })}
          </nav>
          <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-sm font-semibold">Need a quick look?</p><p className="mt-1 text-xs leading-5 text-slate-400">See how your portfolio looks to visitors.</p><Link href="/" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#f1c85e] hover:text-white">Visit website <FiArrowUpRight /></Link></div>
          <div className="mt-5 flex items-center gap-3 border-t border-white/10 px-2 pt-5">
            {profile.avatar ? <Image src={profile.avatar} alt="" width={40} height={40} unoptimized className="h-10 w-10 rounded-full object-cover" /> : <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#27506c] text-sm font-bold">{profile.name.charAt(0)}</span>}
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{profile.name}</p><p className="truncate text-xs text-slate-400">Administrator</p></div>
            <button onClick={() => void logout()} disabled={loggingOut} aria-label="Log out" title="Log out" className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white disabled:opacity-50"><FiLogOut size={17} /></button>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-8">
            <div className="flex items-center gap-3"><button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open navigation menu"><FiMenu size={21} /></button><div><p className="text-xs font-medium text-slate-400">Workspace / {title}</p><h1 className="mt-0.5 text-lg font-bold tracking-tight text-slate-900">{title}</h1></div></div>
            <div className="flex items-center gap-2 sm:gap-4"><Link href="/" className="hidden rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 sm:inline-flex">View website <FiArrowUpRight className="ml-1" /></Link><Link href="/blogs/comments" aria-label="View contact messages" className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50"><FiBell size={18} />{messages.length > 0 && <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#e3ad28]" />}</Link>{profile.avatar ? <Image src={profile.avatar} alt={profile.name} width={36} height={36} unoptimized className="h-9 w-9 rounded-full object-cover" /> : <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8eef3] text-sm font-bold text-[#193b58]">{profile.name.charAt(0)}</span>}</div>
          </header>
          <div className="mx-auto max-w-[1440px] px-4 py-7 sm:px-8 sm:py-9">
            {(notice || error) && <div role={error ? 'alert' : 'status'} className={`mb-5 flex items-start justify-between gap-3 rounded-xl border px-4 py-3 text-sm ${error ? 'border-rose-200 bg-rose-50 text-rose-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}><span>{error || notice}</span><button onClick={() => { setError(''); setNotice(''); }} aria-label="Dismiss notification"><FiX /></button></div>}
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
