'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
} from '../storage';

export type DashboardAsset = StoredAsset & { previewUrl: string };
export type AssetKind = 'image' | 'document';

type DashboardContextValue = {
  assets: DashboardAsset[];
  images: DashboardAsset[];
  documents: DashboardAsset[];
  messages: ContactMessage[];
  profile: Profile;
  notice: string;
  error: string;
  loading: boolean;
  setNotice: (message: string) => void;
  setError: (message: string) => void;
  uploadFiles: (files: FileList | null, kind: AssetKind) => Promise<void>;
  removeAsset: (asset: DashboardAsset) => Promise<void>;
  downloadAsset: (asset: DashboardAsset) => void;
  setMessages: (messages: ContactMessage[]) => boolean;
  saveProfileSettings: (profile: Profile) => boolean;
  setProfile: (profile: Profile) => void;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);
const MAX_FILE_SIZE = 15 * 1024 * 1024;

export function DashboardProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [assets, setAssets] = useState<DashboardAsset[]>([]);
  const [messages, setStoredMessages] = useState<ContactMessage[]>([]);
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const objectUrls = useRef(new Set<string>());

  const refreshMessages = useCallback(() => {
    try {
      setStoredMessages(getMessages().sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
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
        setAssets(storedAssets.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((asset) => {
          const previewUrl = URL.createObjectURL(asset.blob);
          objectUrls.current.add(previewUrl);
          return { ...asset, previewUrl };
        }));
        setProfile(storedProfile);
        refreshMessages();
      } catch {
        if (isMounted) setError('Dashboard data could not be loaded. Check browser storage and reload.');
      } finally {
        if (isMounted) setLoading(false);
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

  const uploadFiles = useCallback(async (files: FileList | null, kind: AssetKind) => {
    if (!files?.length) return;
    setError('');
    setNotice('');
    const accepted: DashboardAsset[] = [];

    for (const file of Array.from(files)) {
      const extension = file.name.split('.').pop()?.toLowerCase();
      const validImage = kind === 'image' && file.type.startsWith('image/');
      const validDocument = kind === 'document' && ['pdf', 'doc', 'docx'].includes(extension ?? '');
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
  }, []);

  const removeAsset = useCallback(async (asset: DashboardAsset) => {
    try {
      await deleteAsset(asset.id);
      URL.revokeObjectURL(asset.previewUrl);
      objectUrls.current.delete(asset.previewUrl);
      setAssets((current) => current.filter((item) => item.id !== asset.id));
      setNotice(`"${asset.name}" was deleted.`);
    } catch {
      setError(`Could not delete "${asset.name}". Please try again.`);
    }
  }, []);

  const downloadAsset = useCallback((asset: DashboardAsset) => {
    const anchor = document.createElement('a');
    anchor.href = asset.previewUrl;
    anchor.download = asset.name;
    anchor.click();
  }, []);

  const updateMessages = useCallback((next: ContactMessage[]) => {
    try {
      saveMessages(next);
      setStoredMessages(next);
      return true;
    } catch {
      setError('Could not update this message. Check browser storage and try again.');
      return false;
    }
  }, []);

  const saveProfileSettings = useCallback((next: Profile) => {
    try {
      saveProfile(next);
      setProfile(next);
      setNotice('Profile settings saved on this device.');
      return true;
    } catch {
      setError('Could not save your profile. Check available browser storage and try again.');
      return false;
    }
  }, []);

  const value = useMemo<DashboardContextValue>(() => ({
    assets,
    images: assets.filter((asset) => asset.kind === 'image'),
    documents: assets.filter((asset) => asset.kind === 'document'),
    messages,
    profile,
    notice,
    error,
    loading,
    setNotice,
    setError,
    uploadFiles,
    removeAsset,
    downloadAsset,
    setMessages: updateMessages,
    saveProfileSettings,
    setProfile,
  }), [assets, messages, profile, notice, error, loading, uploadFiles, removeAsset, downloadAsset, updateMessages, saveProfileSettings]);

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboard must be used inside DashboardProvider.');
  return context;
}
