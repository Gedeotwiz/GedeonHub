'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FiArrowUpRight,
  FiBell,
  FiCheck,
  FiDownload,
  FiFileText,
  FiGrid,
  FiImage,
  FiLogOut,
  FiMail,
  FiMenu,
  FiMessageSquare,
  FiPlus,
  FiSettings,
  FiTrash2,
  FiUser,
  FiX,
} from 'react-icons/fi';
import {
  ContactMessage,
  defaultProfile,
  deleteAsset,
  getAssets,
  getMessages,
  getProfile,
  Profile,
  saveAsset,
  saveMessages,
  saveProfile,
  StoredAsset,
  subscribeToMessages,
} from './storage';

type Section = 'overview' | 'images' | 'documents' | 'comments' | 'settings';
type DashboardAsset = StoredAsset & { previewUrl: string };

const MAX_FILE_SIZE = 15 * 1024 * 1024;

const navItems: { id: Section; label: string; icon: typeof FiGrid }[] = [
  { id: 'overview', label: 'Overview', icon: FiGrid },
  { id: 'images', label: 'Images', icon: FiImage },
  { id: 'documents', label: 'Documents', icon: FiFileText },
  { id: 'comments', label: 'Contact messages', icon: FiMessageSquare },
  { id: 'settings', label: 'Settings', icon: FiSettings },
];

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(
    new Date(date),
  );
}

function UploadButton({
  kind,
  inputRef,
  onUpload,
}: {
  kind: 'image' | 'document';
  inputRef: React.RefObject<HTMLInputElement | null>;
  onUpload: (files: FileList | null, kind: 'image' | 'document') => void;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#193b58] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#245477]">
      <FiPlus aria-hidden="true" />
      {kind === 'image' ? 'Upload images' : 'Upload documents'}
      <input
        ref={inputRef}
        type="file"
        accept={kind === 'image' ? 'image/*' : '.pdf,.doc,.docx'}
        multiple
        className="sr-only"
        onChange={(event) => {
          onUpload(event.target.files, kind);
          event.target.value = '';
        }}
      />
    </label>
  );
}

export default function Dashboard() {
  const [section, setSection] = useState<Section>('overview');
  const [assets, setAssets] = useState<DashboardAsset[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyDraft, setReplyDraft] = useState('');
  const objectUrls = useRef(new Set<string>());
  const imageInput = useRef<HTMLInputElement>(null);
  const documentInput = useRef<HTMLInputElement>(null);

  const refreshMessages = useCallback(() => {
    try {
      setMessages(getMessages().sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    } catch {
      setError('The contact inbox could not be read. Check browser storage and reload the page.');
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const urls = objectUrls.current;

    const loadDashboard = async () => {
      try {
        const [storedAssets, storedProfile] = await Promise.all([getAssets(), Promise.resolve(getProfile())]);
        if (!isMounted) return;
        setAssets(storedAssets
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
          .map((asset) => {
            const previewUrl = URL.createObjectURL(asset.blob);
            objectUrls.current.add(previewUrl);
            return { ...asset, previewUrl };
          }));
        setProfile(storedProfile);
        refreshMessages();
      } catch {
        if (isMounted) setError('Dashboard data could not be loaded. Check browser storage and reload.');
      }
    };

    void loadDashboard();
    const unsubscribe = subscribeToMessages(refreshMessages);
    return () => {
      isMounted = false;
      unsubscribe();
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
    };
  }, [refreshMessages]);

  const images = assets.filter((asset) => asset.kind === 'image');
  const documents = assets.filter((asset) => asset.kind === 'document');

  const uploadFiles = async (files: FileList | null, kind: 'image' | 'document') => {
    if (!files?.length) return;
    setError('');
    setNotice('');
    const accepted: DashboardAsset[] = [];

    for (const file of Array.from(files)) {
      const extension = file.name.split('.').pop()?.toLowerCase();
      const validImage = kind === 'image' && file.type.startsWith('image/');
      const validDocument =
        kind === 'document' && ['pdf', 'doc', 'docx'].includes(extension ?? '');

      if (!validImage && !validDocument) {
        setError(`"${file.name}" is not a supported ${kind === 'image' ? 'image' : 'document'}.`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError(`"${file.name}" is larger than the 15 MB upload limit.`);
        continue;
      }

      const asset: StoredAsset = {
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type || extension || 'file',
        size: file.size,
        kind,
        createdAt: new Date().toISOString(),
        blob: file,
      };

      try {
        await saveAsset(asset);
        const previewUrl = URL.createObjectURL(file);
        objectUrls.current.add(previewUrl);
        accepted.push({ ...asset, previewUrl });
      } catch {
        setError(`Could not save "${file.name}". Check available browser storage and try again.`);
      }
    }

    if (accepted.length) {
      setAssets((current) => [...accepted, ...current]);
      setNotice(`${accepted.length} ${kind === 'image' ? 'image' : 'document'}${accepted.length === 1 ? '' : 's'} uploaded.`);
    }
  };

  const removeAsset = async (asset: DashboardAsset) => {
    try {
      await deleteAsset(asset.id);
      URL.revokeObjectURL(asset.previewUrl);
      objectUrls.current.delete(asset.previewUrl);
      setAssets((current) => current.filter((item) => item.id !== asset.id));
      setNotice(`"${asset.name}" was deleted.`);
    } catch {
      setError(`Could not delete "${asset.name}". Please try again.`);
    }
  };

  const downloadAsset = (asset: DashboardAsset) => {
    const anchor = document.createElement('a');
    anchor.href = asset.previewUrl;
    anchor.download = asset.name;
    anchor.click();
  };

  const deleteMessage = (id: string) => {
    try {
      const next = messages.filter((message) => message.id !== id);
      saveMessages(next);
      setMessages(next);
      setNotice('Contact message deleted.');
    } catch {
      setError('Could not delete this message. Check browser storage and try again.');
    }
  };

  const openReply = (message: ContactMessage) => {
    setReplyingTo(message.id);
    setReplyDraft(message.replyDraft ?? '');
  };

  const prepareReply = (message: ContactMessage) => {
    const draft = replyDraft.trim();
    if (!draft) return;

    try {
      const next = messages.map((item) =>
        item.id === message.id ? { ...item, replyDraft: draft } : item,
      );
      saveMessages(next);
      setMessages(next);
      window.location.href = `mailto:${encodeURIComponent(message.email)}?subject=${encodeURIComponent(`Re: ${message.subject || 'Your message'}`)}&body=${encodeURIComponent(draft)}`;
      setReplyingTo(null);
      setNotice('Reply draft opened in your email app.');
    } catch {
      setError('Could not prepare this reply. Check browser storage and try again.');
    }
  };

  const updateProfile = (key: keyof Profile, value: string) => {
    setProfile((current) => ({ ...current, [key]: value }));
  };

  const submitProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      saveProfile(profile);
      setNotice('Profile settings saved on this device.');
    } catch {
      setError('Could not save your profile. Check available browser storage and try again.');
    }
  };

  const changeAvatar = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Choose an image file for your profile photo.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateProfile('avatar', String(reader.result));
    reader.onerror = () => setError('Could not read that profile image.');
    reader.readAsDataURL(file);
  };

  const navigate = (nextSection: Section) => {
    setSection(nextSection);
    setSidebarOpen(false);
    setNotice('');
    setError('');
  };

  const renderAssets = (items: DashboardAsset[], kind: 'image' | 'document') => {
    if (!items.length) {
      return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            {kind === 'image' ? <FiImage size={21} /> : <FiFileText size={21} />}
          </div>
          <p className="font-semibold text-slate-800">Nothing uploaded yet</p>
          <p className="mt-1 text-sm text-slate-500">
            {kind === 'image' ? 'Add an image to start your gallery.' : 'Add a PDF, DOC, or DOCX file.'}
          </p>
          <div className="mt-5">
            <UploadButton
              kind={kind}
              inputRef={kind === 'image' ? imageInput : documentInput}
              onUpload={uploadFiles}
            />
          </div>
        </div>
      );
    }

    return kind === 'image' ? (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((asset) => (
          <article key={asset.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img src={asset.previewUrl} alt={asset.name} className="h-52 w-full bg-slate-100 object-cover" />
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">{asset.name}</p>
                <p className="mt-1 text-xs text-slate-500">{formatBytes(asset.size)} · {formatDate(asset.createdAt)}</p>
              </div>
              <AssetActions asset={asset} onDownload={downloadAsset} onDelete={removeAsset} />
            </div>
          </article>
        ))}
      </div>
    ) : (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="hidden grid-cols-[minmax(0,1fr)_120px_140px_90px] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:grid">
          <span>Document</span><span>Size</span><span>Uploaded</span><span>Actions</span>
        </div>
        {items.map((asset) => (
          <div key={asset.id} className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-4 py-4 last:border-0 sm:grid sm:grid-cols-[minmax(0,1fr)_120px_140px_90px] sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700"><FiFileText size={19} /></span>
              <div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-800">{asset.name}</p><p className="text-xs uppercase text-slate-500">{asset.name.split('.').pop()}</p></div>
            </div>
            <span className="text-sm text-slate-600">{formatBytes(asset.size)}</span>
            <span className="text-sm text-slate-600">{formatDate(asset.createdAt)}</span>
            <AssetActions asset={asset} onDownload={downloadAsset} onDelete={removeAsset} />
          </div>
        ))}
      </div>
    );
  };

  const title = navItems.find((item) => item.id === section)?.label ?? 'Overview';

  return (
    <main className="min-h-screen bg-[#f5f7fa] text-slate-900">
      <div className="flex min-h-screen">
        {sidebarOpen && (
          <button aria-label="Close navigation menu" className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
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
            {navItems.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => navigate(id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${section === id ? 'bg-[#e3ad28] text-[#142b40] shadow-sm' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}>
                <Icon size={18} aria-hidden="true" />{label}
                {id === 'comments' && messages.length > 0 && <span className={`ml-auto rounded-full px-2 py-0.5 text-xs ${section === id ? 'bg-[#142b40]/10' : 'bg-white/10'}`}>{messages.length}</span>}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm font-semibold">Need a quick look?</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">See how your portfolio looks to visitors.</p>
            <Link href="/" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#f1c85e] hover:text-white">Visit website <FiArrowUpRight /></Link>
          </div>
          <div className="mt-5 flex items-center gap-3 border-t border-white/10 px-2 pt-5">
            {profile.avatar ? <img src={profile.avatar} alt="" className="h-10 w-10 rounded-full object-cover" /> : <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#27506c] text-sm font-bold">{profile.name.charAt(0)}</span>}
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{profile.name}</p><p className="truncate text-xs text-slate-400">Administrator</p></div>
            <Link href="/" aria-label="Log out and return to website" title="Log out" className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"><FiLogOut size={17} /></Link>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-8">
            <div className="flex items-center gap-3">
              <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open navigation menu"><FiMenu size={21} /></button>
              <div><p className="text-xs font-medium text-slate-400">Workspace / {title}</p><h1 className="mt-0.5 text-lg font-bold tracking-tight text-slate-900">{title}</h1></div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/" className="hidden rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 sm:inline-flex">View website <FiArrowUpRight className="ml-1" /></Link>
              <button onClick={() => navigate('comments')} aria-label="View contact messages" className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50"><FiBell size={18} />{messages.length > 0 && <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#e3ad28]" />}</button>
              {profile.avatar ? <img src={profile.avatar} alt={profile.name} className="h-9 w-9 rounded-full object-cover" /> : <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8eef3] text-sm font-bold text-[#193b58]">{profile.name.charAt(0)}</span>}
            </div>
          </header>

          <div className="mx-auto max-w-[1440px] px-4 py-7 sm:px-8 sm:py-9">
            {(notice || error) && <div role={error ? 'alert' : 'status'} className={`mb-5 flex items-start justify-between gap-3 rounded-xl border px-4 py-3 text-sm ${error ? 'border-rose-200 bg-rose-50 text-rose-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}><span>{error || notice}</span><button onClick={() => { setError(''); setNotice(''); }} aria-label="Dismiss notification"><FiX /></button></div>}

            {section === 'overview' && (
              <div className="space-y-7">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div><p className="text-sm text-slate-500">Here&apos;s what&apos;s happening with your portfolio.</p><h2 className="mt-1 text-2xl font-bold tracking-tight">Welcome back, {profile.name.split(' ')[0]} <span aria-hidden="true">👋</span></h2></div>
                  <div className="flex flex-wrap gap-2"><UploadButton kind="image" inputRef={imageInput} onUpload={uploadFiles} /><UploadButton kind="document" inputRef={documentInput} onUpload={uploadFiles} /></div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <MetricCard label="Total images" value={images.length} icon={<FiImage />} color="blue" />
                  <MetricCard label="Documents" value={documents.length} icon={<FiFileText />} color="amber" />
                  <MetricCard label="Contact messages" value={messages.length} icon={<FiMessageSquare />} color="purple" />
                  <MetricCard label="Profile" value="Active" icon={<FiUser />} color="green" />
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-5 flex items-center justify-between"><div><h3 className="font-bold">Your image gallery</h3><p className="mt-1 text-sm text-slate-500">Recently uploaded photos</p></div><button onClick={() => navigate('images')} className="text-sm font-semibold text-[#1e5274] hover:underline">View all</button></div>
                    {images.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{images.slice(0, 3).map((asset) => <button key={asset.id} onClick={() => navigate('images')} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 text-left"><img src={asset.previewUrl} alt={asset.name} className="h-full w-full object-cover transition group-hover:scale-105" /><span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-7 text-xs font-medium text-white">{asset.name}</span></button>)}</div> : <EmptyOverview icon={<FiImage />} title="Your gallery is ready" text="Upload photos to start building your image gallery." onClick={() => navigate('images')} action="Open images" />}
                  </section>
                  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-4 flex items-center justify-between"><div><h3 className="font-bold">Latest messages</h3><p className="mt-1 text-sm text-slate-500">From your contact form</p></div><button onClick={() => navigate('comments')} className="text-sm font-semibold text-[#1e5274] hover:underline">Inbox</button></div>
                    {messages.length ? <div className="space-y-4">{messages.slice(0, 3).map((message) => <button key={message.id} onClick={() => navigate('comments')} className="flex w-full items-start gap-3 border-b border-slate-100 pb-4 text-left last:border-0 last:pb-0"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#edf3f7] text-xs font-bold text-[#1e5274]">{message.name.charAt(0)}</span><span className="min-w-0 flex-1"><span className="flex justify-between gap-2"><span className="truncate text-sm font-semibold">{message.name}</span><span className="shrink-0 text-[11px] text-slate-400">{formatDate(message.createdAt)}</span></span><span className="mt-1 block truncate text-xs text-slate-500">{message.message}</span></span></button>)}</div> : <EmptyOverview icon={<FiMail />} title="Your inbox is clear" text="Messages sent through your contact form will appear here." onClick={() => navigate('comments')} action="Open inbox" />}
                  </section>
                </div>

                <div className="rounded-2xl border border-[#e7dcc0] bg-[#fffaf0] p-4 text-sm leading-6 text-[#6f5c32]"><strong>Local dashboard:</strong> files, profile settings, and contact messages are stored in this browser only. They are not uploaded to a server or shared across devices.</div>
              </div>
            )}

            {section === 'images' && <div className="space-y-6"><PageHeading title="Image gallery" description={`${images.length} ${images.length === 1 ? 'image' : 'images'} in your gallery. Upload, preview, or download your photos.`}><UploadButton kind="image" inputRef={imageInput} onUpload={uploadFiles} /></PageHeading>{renderAssets(images, 'image')}</div>}

            {section === 'documents' && <div className="space-y-6"><PageHeading title="Documents" description={`${documents.length} ${documents.length === 1 ? 'document' : 'documents'} saved. PDF, DOC, and DOCX files are supported.`}><UploadButton kind="document" inputRef={documentInput} onUpload={uploadFiles} /></PageHeading>{renderAssets(documents, 'document')}<p className="text-xs text-slate-500">Files are limited to 15 MB and are stored in this browser.</p></div>}

            {section === 'comments' && (
              <div className="space-y-6">
                <PageHeading title="Contact messages" description="Review messages submitted through the contact form." />
                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600"><span className="font-semibold text-slate-800">Inbox note:</span> messages submitted from this website in this browser are saved here. Replies open your email app as a draft.</div>
                {messages.length ? <div className="space-y-4">{messages.map((message) => <article key={message.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div className="flex min-w-0 items-start gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf3f7] font-bold text-[#1e5274]">{message.name.charAt(0)}</span><div className="min-w-0"><h3 className="font-bold text-slate-900">{message.name}</h3><a href={`mailto:${message.email}`} className="break-all text-sm text-[#1e5274] hover:underline">{message.email}</a><p className="mt-1 text-xs text-slate-400">{message.subject || 'No subject'} · {formatDate(message.createdAt)}</p></div></div><button onClick={() => deleteMessage(message.id)} className="inline-flex items-center gap-2 self-start rounded-lg px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"><FiTrash2 /> Delete</button></div><p className="mt-5 whitespace-pre-wrap text-sm leading-6 text-slate-700">{message.message}</p>{message.replyDraft && <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"><FiCheck /> Reply draft prepared</p>}{replyingTo === message.id ? <div className="mt-5 space-y-3"><textarea value={replyDraft} onChange={(event) => setReplyDraft(event.target.value)} rows={4} placeholder={`Write a reply to ${message.name}...`} className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#1e5274] focus:ring-2 focus:ring-[#1e5274]/10" /><div className="flex flex-wrap gap-2"><button onClick={() => prepareReply(message)} disabled={!replyDraft.trim()} className="inline-flex items-center gap-2 rounded-lg bg-[#193b58] px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"><FiMail /> Open email draft</button><button onClick={() => setReplyingTo(null)} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</button></div></div> : <button onClick={() => openReply(message)} className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><FiMail /> Reply</button>}</article>)}</div> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500"><FiMessageSquare size={21} /></span><h3 className="mt-4 font-semibold text-slate-800">No contact messages yet</h3><p className="mx-auto mt-1 max-w-md text-sm text-slate-500">When someone submits the contact form on your website using this browser, their message will show up here.</p></div>}
              </div>
            )}

            {section === 'settings' && (
              <div className="max-w-3xl space-y-6">
                <PageHeading title="Profile settings" description="Update the profile details shown in your dashboard." />
                <form onSubmit={submitProfile} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                  <div className="flex flex-wrap items-center gap-4 border-b border-slate-100 pb-6">{profile.avatar ? <img src={profile.avatar} alt="Profile preview" className="h-16 w-16 rounded-full object-cover" /> : <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#edf3f7] text-xl font-bold text-[#1e5274]">{profile.name.charAt(0)}</span>}<div><p className="font-semibold">Profile photo</p><label className="mt-1 inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-[#1e5274] hover:underline">Choose an image<input type="file" accept="image/*" className="sr-only" onChange={(event) => changeAvatar(event.target.files?.[0])} /></label></div></div>
                  <div className="grid gap-5 sm:grid-cols-2"><FormField label="Name" value={profile.name} onChange={(value) => updateProfile('name', value)} /><FormField label="Email address" type="email" value={profile.email} onChange={(value) => updateProfile('email', value)} /><div className="sm:col-span-2"><FormField label="Professional title" value={profile.role} onChange={(value) => updateProfile('role', value)} /></div></div>
                  <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-5"><p className="text-xs text-slate-500">Settings are saved in this browser only.</p><button type="submit" className="rounded-xl bg-[#193b58] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#245477]">Save changes</button></div>
                </form>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function AssetActions({ asset, onDownload, onDelete }: { asset: DashboardAsset; onDownload: (asset: DashboardAsset) => void; onDelete: (asset: DashboardAsset) => void }) {
  return <div className="flex shrink-0 items-center gap-1"><button onClick={() => onDownload(asset)} aria-label={`Download ${asset.name}`} title="Download" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-[#1e5274]"><FiDownload size={16} /></button><button onClick={() => onDelete(asset)} aria-label={`Delete ${asset.name}`} title="Delete" className="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600"><FiTrash2 size={16} /></button></div>;
}

function MetricCard({ label, value, icon, color }: { label: string; value: string | number; icon: React.ReactNode; color: 'blue' | 'amber' | 'purple' | 'green' }) {
  const colors = { blue: 'bg-blue-50 text-blue-700', amber: 'bg-amber-50 text-amber-700', purple: 'bg-violet-50 text-violet-700', green: 'bg-emerald-50 text-emerald-700' };
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-500">{label}</span><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors[color]}`}>{icon}</span></div><p className="mt-4 text-2xl font-bold tracking-tight">{value}</p><p className="mt-1 text-xs text-slate-400">Stored on this device</p></div>;
}

function PageHeading({ title, description, children }: { title: string; description: string; children?: React.ReactNode }) {
  return <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="text-2xl font-bold tracking-tight">{title}</h2><p className="mt-1 text-sm text-slate-500">{description}</p></div>{children}</div>;
}

function EmptyOverview({ icon, title, text, action, onClick }: { icon: React.ReactNode; title: string; text: string; action: string; onClick: () => void }) {
  return <div className="flex min-h-44 flex-col items-center justify-center rounded-xl bg-slate-50 px-5 text-center"><span className="text-slate-400">{icon}</span><p className="mt-2 text-sm font-semibold text-slate-700">{title}</p><p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">{text}</p><button onClick={onClick} className="mt-3 text-xs font-semibold text-[#1e5274] hover:underline">{action}</button></div>;
}

function FormField({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <label className="block text-sm font-medium text-slate-700">{label}<input type={type} required value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#1e5274] focus:ring-2 focus:ring-[#1e5274]/10" /></label>;
}
