import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const MirrorInsightApp = lazy(() => import('../apps/mirror-insight/MirrorInsightApp'));

export const Route = createFileRoute('/mirror-insight')({
  component: MirrorInsightPage,
});

function MirrorInsightPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f2f4f6]"><div className="w-8 h-8 border-4 border-[#ca8a04] border-t-transparent rounded-full animate-spin" /></div>}>
      <MirrorInsightApp />
    </Suspense>
  );
}
