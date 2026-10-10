'use client';

import { useState } from 'react';
import { FiCheck, FiMail, FiMessageSquare, FiTrash2 } from 'react-icons/fi';
import { useDashboard } from '../dashboard-provider';
import { formatDate, PageHeading } from '../dashboard-ui';

export default function MessagesPage() {
  const { messages, setMessages, setNotice } = useDashboard();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyDraft, setReplyDraft] = useState('');

  const deleteMessage = (id: string) => {
    if (setMessages(messages.filter((message) => message.id !== id))) {
      setNotice('Contact message deleted.');
    }
  };

  const openReply = (id: string) => {
    setReplyingTo(id);
    setReplyDraft(messages.find((message) => message.id === id)?.replyDraft ?? '');
  };

  const prepareReply = (id: string, email: string, subject: string) => {
    const draft = replyDraft.trim();
    if (!draft) return;
    const next = messages.map((message) => message.id === id ? { ...message, replyDraft: draft } : message);
    if (!setMessages(next)) return;
    window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subject || 'Your message'}`)}&body=${encodeURIComponent(draft)}`;
    setReplyingTo(null);
    setNotice('Reply draft opened in your email app.');
  };

  return <div className="space-y-6"><PageHeading title="Contact messages" description="Review messages submitted through the contact form." />
    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600"><span className="font-semibold text-slate-800">Inbox note:</span> messages submitted from this website in this browser are saved here. Replies open your email app as a draft.</div>
    {messages.length ? <div className="space-y-4">{messages.map((message) => <article key={message.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div className="flex min-w-0 items-start gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf3f7] font-bold text-[#1e5274]">{message.name.charAt(0)}</span><div className="min-w-0"><h3 className="font-bold text-slate-900">{message.name}</h3><a href={`mailto:${message.email}`} className="break-all text-sm text-[#1e5274] hover:underline">{message.email}</a><p className="mt-1 text-xs text-slate-400">{message.subject || 'No subject'} · {formatDate(message.createdAt)}</p></div></div><button onClick={() => deleteMessage(message.id)} className="inline-flex items-center gap-2 self-start rounded-lg px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"><FiTrash2 /> Delete</button></div>
      <p className="mt-5 whitespace-pre-wrap text-sm leading-6 text-slate-700">{message.message}</p>
      {message.replyDraft && <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"><FiCheck /> Reply draft prepared</p>}
      {replyingTo === message.id ? <div className="mt-5 space-y-3"><textarea value={replyDraft} onChange={(event) => setReplyDraft(event.target.value)} rows={4} placeholder={`Write a reply to ${message.name}...`} className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#1e5274] focus:ring-2 focus:ring-[#1e5274]/10" /><div className="flex flex-wrap gap-2"><button onClick={() => prepareReply(message.id, message.email, message.subject)} disabled={!replyDraft.trim()} className="inline-flex items-center gap-2 rounded-lg bg-[#193b58] px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"><FiMail /> Open email draft</button><button onClick={() => setReplyingTo(null)} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</button></div></div> : <button onClick={() => openReply(message.id)} className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><FiMail /> Reply</button>}
    </article>)}</div> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500"><FiMessageSquare size={21} /></span><h3 className="mt-4 font-semibold text-slate-800">No contact messages yet</h3><p className="mx-auto mt-1 max-w-md text-sm text-slate-500">When someone submits the contact form on your website using this browser, their message will show up here.</p></div>}
  </div>;
}
