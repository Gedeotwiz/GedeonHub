export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  replyDraft?: string;
};

export type Profile = {
  name: string;
  email: string;
  role: string;
  avatar: string;
};

export type StoredAsset = {
  id: string;
  name: string;
  type: string;
  size: number;
  kind: 'image' | 'document';
  createdAt: string;
  blob: Blob;
};

const MESSAGE_KEY = 'gedeonhub-contact-messages';
const PROFILE_KEY = 'gedeonhub-dashboard-profile';
const MESSAGE_EVENT = 'gedeonhub-contact-messages-updated';
const DATABASE_NAME = 'gedeonhub-dashboard';
const ASSET_STORE = 'assets';

export const defaultProfile: Profile = {
  name: 'Gedeon Tetch',
  email: 'gedeontwizerimana6@gmail.com',
  role: 'UI/UX & Fullstack Developer',
  avatar: '',
};

export function getMessages(): ContactMessage[] {
  const value = window.localStorage.getItem(MESSAGE_KEY);
  return value ? (JSON.parse(value) as ContactMessage[]) : [];
}

export function saveMessages(messages: ContactMessage[]) {
  window.localStorage.setItem(MESSAGE_KEY, JSON.stringify(messages));
  window.dispatchEvent(new Event(MESSAGE_EVENT));
}

export function subscribeToMessages(onChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === MESSAGE_KEY) onChange();
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener(MESSAGE_EVENT, onChange);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(MESSAGE_EVENT, onChange);
  };
}

export function getProfile(): Profile {
  const value = window.localStorage.getItem(PROFILE_KEY);
  return value ? { ...defaultProfile, ...(JSON.parse(value) as Partial<Profile>) } : defaultProfile;
}

export function saveProfile(profile: Profile) {
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function openAssetDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DATABASE_NAME, 1);

    request.onupgradeneeded = () => {
      request.result.createObjectStore(ASSET_STORE, { keyPath: 'id' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Could not open local file storage.'));
  });
}

export async function getAssets(): Promise<StoredAsset[]> {
  const database = await openAssetDatabase();

  return new Promise((resolve, reject) => {
    const request = database.transaction(ASSET_STORE, 'readonly').objectStore(ASSET_STORE).getAll();
    request.onsuccess = () => {
      database.close();
      resolve(request.result as StoredAsset[]);
    };
    request.onerror = () => {
      database.close();
      reject(request.error ?? new Error('Could not load saved files.'));
    };
  });
}

export async function saveAsset(asset: StoredAsset) {
  const database = await openAssetDatabase();

  return new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(ASSET_STORE, 'readwrite');
    transaction.objectStore(ASSET_STORE).put(asset);
    transaction.oncomplete = () => {
      database.close();
      resolve();
    };
    transaction.onerror = () => {
      database.close();
      reject(transaction.error ?? new Error('Could not save this file.'));
    };
    transaction.onabort = () => {
      database.close();
      reject(transaction.error ?? new Error('Saving this file was cancelled.'));
    };
  });
}

export async function deleteAsset(id: string) {
  const database = await openAssetDatabase();

  return new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(ASSET_STORE, 'readwrite');
    transaction.objectStore(ASSET_STORE).delete(id);
    transaction.oncomplete = () => {
      database.close();
      resolve();
    };
    transaction.onerror = () => {
      database.close();
      reject(transaction.error ?? new Error('Could not delete this file.'));
    };
    transaction.onabort = () => {
      database.close();
      reject(transaction.error ?? new Error('Deleting this file was cancelled.'));
    };
  });
}
