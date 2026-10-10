'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiLock, FiUser } from 'react-icons/fi';
import { Spinner } from '@/app/components/spinner';
import { toast } from 'react-toastify';

export default function LoginForm({ configured }: { configured: boolean }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormOpen(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const response = await fetch('/api/blogs/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(result.error ?? 'Could not sign in. Please try again.');
        return;
      }
      toast.success('Signed in successfully!', { autoClose: 3000 });

      setTimeout(()=>{
        const next = searchParams.get('next');
      router.replace(next?.startsWith('/blogs/') && !next.startsWith('/blogs/login') ? next : '/blogs/overview');
      router.refresh();
      },3000)
      
    } catch {
      setError('Could not reach the sign-in service. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  
return (
  <main className="flex min-h-screen items-center justify-center bg-[url('/bgg.jpg')] bg-cover bg-center bg-no-repeat px-3 py-6 text-slate-900 sm:px-5 sm:py-12">
    {formOpen ? (
       <div className="w-full max-w-[340px] rounded-3xl border border-slate-200 bg-white  p-3 shadow-xl shadow-slate-900/5 sm:p-9">
      
      <div className="mb-3">
        <div className="flex items-center justify-center">
           <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf3f7] text-[#1e5274]">
          <FiLock size={22} />
        </span>
        </div>

        <h1 className="mt-2 text-2xl text-center font-bold tracking-tight">
          Sign in to Blogs
        </h1>
        <p className="text-[8px] text-center font-bold uppercase tracking-[0.18em] text-[#1e5274]">
          Private workspace
        </p>
        
      </div>
       
         <form onSubmit={submit} className="space-y-4">
          
          <label className="block text-sm font-medium text-slate-700">
            Username

            <span className="relative mt-2 block">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                autoComplete="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-xl border border-slate-200 py-[5px] pl-10 pr-4 text-sm outline-none focus:border-[#1e5274] focus:ring-2 focus:ring-[#1e5274]/10"
              />
            </span>
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Password

            <span className="relative mt-2 block">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-200 py-[5px] pl-10 pr-4 text-sm outline-none focus:border-[#1e5274] focus:ring-2 focus:ring-[#1e5274]/10"
              />
            </span>
          </label>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || !configured}
            className="w-full rounded-xl bg-[#193b58] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#245477] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Signing in…" : configured ? "Sign in" : "Configure login first"}
          </button>
      </form>
      
      

      <p className="mt-6 text-center text-xs text-slate-400">
        <Link
          href="/"
          className="font-medium text-[#1e5274] hover:underline"
        >
          Return to the public website
        </Link>
      </p>
    </div>
    ):(<Spinner/>)}

    
  </main>
)
}
