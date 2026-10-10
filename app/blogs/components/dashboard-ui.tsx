'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { FiDownload, FiFileText, FiImage, FiPlus, FiTrash2 } from 'react-icons/fi';
import { DashboardAsset, useDashboard } from './dashboard-provider';

interface IProp {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function PageHeading({ title, description, children }: IProp) {
  return (
  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
        {children}
  </div>
  )
}

export function UploadButton({ kind }: { kind: 'image' | 'document' }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadFiles } = useDashboard();

  return (
  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#193b58] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#245477]">
    <FiPlus aria-hidden="true" />
    {kind === 'image' ? 'Upload images' : 'Upload documents'}
    <input ref={inputRef} type="file" accept={kind === 'image' ? 'image/*' : '.pdf,.doc,.docx'} multiple className="sr-only" onChange={(event) => { void uploadFiles(event.target.files, kind); event.target.value = ''; }} />
  </label>
  )
}

export function AssetActions({ asset }: { asset: DashboardAsset }) {
  const { downloadAsset, removeAsset } = useDashboard();
  return <div className="flex shrink-0 items-center gap-1"><button onClick={() => downloadAsset(asset)} aria-label={`Download ${asset.name}`} title="Download" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-[#1e5274]"><FiDownload size={16} /></button><button onClick={() => void removeAsset(asset)} aria-label={`Delete ${asset.name}`} title="Delete" className="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600"><FiTrash2 size={16} /></button></div>;
}

export function AssetList({ kind }: { kind: 'image' | 'document' }) {
  const { images, documents } = useDashboard();
  const items = kind === 'image' ? images : documents;

  if (!items.length) {
    return <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">{kind === 'image' ? <FiImage size={21} /> : <FiFileText size={21} />}</div>
      <p className="font-semibold text-slate-800">Nothing uploaded yet</p><p className="mt-1 text-sm text-slate-500">{kind === 'image' ? 'Add an image to start your gallery.' : 'Add a PDF, DOC, or DOCX file.'}</p>
      <div className="mt-5"><UploadButton kind={kind} /></div>
    </div>;
  }

  if (kind === 'image') {
    return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map((asset) => <article key={asset.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><Image src={asset.previewUrl} alt={asset.name} width={640} height={420} unoptimized className="h-52 w-full bg-slate-100 object-cover" /><div className="flex items-center justify-between gap-3 p-4"><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-800">{asset.name}</p><p className="mt-1 text-xs text-slate-500">{formatBytes(asset.size)} · {formatDate(asset.createdAt)}</p></div><AssetActions asset={asset} /></div></article>)}</div>;
  }

  return <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
    <div className="hidden grid-cols-[minmax(0,1fr)_120px_140px_90px] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:grid"><span>Document</span><span>Size</span><span>Uploaded</span><span>Actions</span></div>
    {items.map((asset) => <div key={asset.id} className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-4 py-4 last:border-0 sm:grid sm:grid-cols-[minmax(0,1fr)_120px_140px_90px] sm:px-5"><div className="flex min-w-0 items-center gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700"><FiFileText size={19} /></span><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-800">{asset.name}</p><p className="text-xs uppercase text-slate-500">{asset.name.split('.').pop()}</p></div></div><span className="text-sm text-slate-600">{formatBytes(asset.size)}</span><span className="text-sm text-slate-600">{formatDate(asset.createdAt)}</span><AssetActions asset={asset} /></div>)}
  </div>;
}

export function MetricCard({ label, value, icon, color }: { label: string; value: string | number; icon: React.ReactNode; color: 'blue' | 'amber' | 'purple' | 'green' }) {
  const colors = { blue: 'bg-blue-50 text-blue-700', amber: 'bg-amber-50 text-amber-700', purple: 'bg-violet-50 text-violet-700', green: 'bg-emerald-50 text-emerald-700' };
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-500">{label}</span><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors[color]}`}>{icon}</span></div><p className="mt-4 text-2xl font-bold tracking-tight">{value}</p><p className="mt-1 text-xs text-slate-400">Stored on this device</p></div>;
}

export function EmptyPanel({ icon, title, text, action, onClick }: { icon: React.ReactNode; title: string; text: string; action: string; onClick: () => void }) {
  return <div className="flex min-h-44 flex-col items-center justify-center rounded-xl bg-slate-50 px-5 text-center"><span className="text-slate-400">{icon}</span><p className="mt-2 text-sm font-semibold text-slate-700">{title}</p><p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">{text}</p><button onClick={onClick} className="mt-3 text-xs font-semibold text-[#1e5274] hover:underline">{action}</button></div>;
}

export function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date));
}
