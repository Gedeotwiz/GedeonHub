'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useDashboard } from '../dashboard-provider';
import { PageHeading } from '../dashboard-ui';

export default function SettingsPage() {
  const { profile, setProfile, saveProfileSettings, setError } = useDashboard();
  const avatarInput = useRef<HTMLInputElement>(null);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveProfileSettings(profile);
  };

  const changeAvatar = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Choose an image file for your profile photo.');
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setError('Profile photos must be smaller than 3 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setProfile({ ...profile, avatar: String(reader.result) });
    reader.onerror = () => setError('Could not read that profile image.');
    reader.readAsDataURL(file);
  };

  return <div className="max-w-3xl space-y-6">
    <PageHeading title="Profile settings" description="Update the profile details shown in your dashboard." />
    <form onSubmit={submit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-wrap items-center gap-4 border-b border-slate-100 pb-6">
        {profile.avatar ? <Image src={profile.avatar} alt="Profile preview" width={64} height={64} unoptimized className="h-16 w-16 rounded-full object-cover" /> : <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#edf3f7] text-xl font-bold text-[#1e5274]">{profile.name.charAt(0)}</span>}
        <div><p className="font-semibold">Profile photo</p><label className="mt-1 inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-[#1e5274] hover:underline">Choose an image<input ref={avatarInput} type="file" accept="image/*" className="sr-only" onChange={(event) => { changeAvatar(event.target.files?.[0]); event.target.value = ''; }} /></label></div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <ProfileField label="Name" value={profile.name} onChange={(name) => setProfile({ ...profile, name })} />
        <ProfileField label="Email address" type="email" value={profile.email} onChange={(email) => setProfile({ ...profile, email })} />
        <div className="sm:col-span-2"><ProfileField label="Professional title" value={profile.role} onChange={(role) => setProfile({ ...profile, role })} /></div>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-5"><p className="text-xs text-slate-500">Settings are saved in this browser only.</p><button type="submit" className="rounded-xl bg-[#193b58] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#245477]">Save changes</button></div>
    </form>
  </div>;
}

function ProfileField({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <label className="block text-sm font-medium text-slate-700">{label}<input type={type} required value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#1e5274] focus:ring-2 focus:ring-[#1e5274]/10" /></label>;
}
