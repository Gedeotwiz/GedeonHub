'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiFileText, FiImage, FiMail, FiMessageSquare, FiUser } from 'react-icons/fi';
import { useDashboard } from '../dashboard-provider';
import { EmptyPanel, formatDate, MetricCard, UploadButton } from '../dashboard-ui';

export default function OverviewPage() {
  const router = useRouter();
  const { images, documents, messages, profile, loading } = useDashboard();
  if (loading) return <p className="text-sm text-slate-500">Loading your dashboard…</p>;

  return <div className="space-y-7">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm text-slate-500">Here&apos;s what&apos;s happening with your portfolio.</p><h2 className="mt-1 text-2xl font-bold tracking-tight">Welcome back, {profile.name.split(' ')[0]} <span aria-hidden="true">👋</span></h2></div><div className="flex flex-wrap gap-2"><UploadButton kind="image" /><UploadButton kind="document" /></div></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label="Total images" value={images.length} icon={<FiImage />} color="blue" /><MetricCard label="Documents" value={documents.length} icon={<FiFileText />} color="amber" /><MetricCard label="Contact messages" value={messages.length} icon={<FiMessageSquare />} color="purple" /><MetricCard label="Profile" value="Active" icon={<FiUser />} color="green" /></div>
    <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="mb-5 flex items-center justify-between"><div><h3 className="font-bold">Your image gallery</h3><p className="mt-1 text-sm text-slate-500">Recently uploaded photos</p></div><button onClick={() => router.push('/blogs/images')} className="text-sm font-semibold text-[#1e5274] hover:underline">View all</button></div>
        {images.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{images.slice(0, 3).map((asset) => <button key={asset.id} onClick={() => router.push('/blogs/images')} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 text-left"><Image src={asset.previewUrl} alt={asset.name} width={480} height={360} unoptimized className="h-full w-full object-cover transition group-hover:scale-105" /><span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-7 text-xs font-medium text-white">{asset.name}</span></button>)}</div> : <EmptyPanel icon={<FiImage />} title="Your gallery is ready" text="Upload photos to start building your image gallery." onClick={() => router.push('/blogs/images')} action="Open images" />}
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="mb-4 flex items-center justify-between"><div><h3 className="font-bold">Latest messages</h3><p className="mt-1 text-sm text-slate-500">From your contact form</p></div><button onClick={() => router.push('/blogs/comments')} className="text-sm font-semibold text-[#1e5274] hover:underline">Inbox</button></div>
        {messages.length ? <div className="space-y-4">{messages.slice(0, 3).map((message) => <button key={message.id} onClick={() => router.push('/blogs/comments')} className="flex w-full items-start gap-3 border-b border-slate-100 pb-4 text-left last:border-0 last:pb-0"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#edf3f7] text-xs font-bold text-[#1e5274]">{message.name.charAt(0)}</span><span className="min-w-0 flex-1"><span className="flex justify-between gap-2"><span className="truncate text-sm font-semibold">{message.name}</span><span className="shrink-0 text-[11px] text-slate-400">{formatDate(message.createdAt)}</span></span><span className="mt-1 block truncate text-xs text-slate-500">{message.message}</span></span></button>)}</div> : <EmptyPanel icon={<FiMail />} title="Your inbox is clear" text="Messages sent through your contact form will appear here." onClick={() => router.push('/blogs/comments')} action="Open inbox" />}
      </section>
    </div>
    <div className="rounded-2xl border border-[#e7dcc0] bg-[#fffaf0] p-4 text-sm leading-6 text-[#6f5c32]"><strong>Local dashboard:</strong> files, profile settings, and contact messages are stored in this browser only. They are not uploaded to a server or shared across devices.</div>
  </div>;
}
