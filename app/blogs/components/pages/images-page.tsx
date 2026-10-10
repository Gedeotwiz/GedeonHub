'use client';

import { useDashboard } from '../dashboard-provider';
import { AssetList, PageHeading, UploadButton } from '../dashboard-ui';

export default function ImagesPage() {
  const { images } = useDashboard();
  return <div className="space-y-6"><PageHeading title="Image gallery" description={`${images.length} ${images.length === 1 ? 'image' : 'images'} in your gallery. Upload, preview, or download your photos.`}><UploadButton kind="image" /></PageHeading><AssetList kind="image" /></div>;
}
