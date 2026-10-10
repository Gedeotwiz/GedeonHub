'use client';

import { useDashboard } from '../dashboard-provider';
import { AssetList, PageHeading, UploadButton } from '../dashboard-ui';

export default function DocumentsPage() { 
  const { documents } = useDashboard();
  return (
      <div className="space-y-6">
        <PageHeading 
        title="Documents" 
        description={`${documents.length} ${documents.length === 1 ? 'document' : 'documents'} saved. PDF, DOC, and DOCX files are supported.`}
        >
        <UploadButton kind="document" />
        </PageHeading><AssetList kind="document" />
        <p className="text-xs text-slate-500">Files are limited to 15 MB and are stored in this browser.</p>
      </div>
  )
}
