import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const PinkfongApp = lazy(() => import('../apps/pinkfong/App').then(m => ({ default: m.PinkfongApp })));

export const Route = createFileRoute('/pinkfong')({
  component: PinkfongPage,
});

function PinkfongPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#db2777', borderTopColor: 'transparent' }} /></div>}>
      <PinkfongApp />
    </Suspense>
  );
}
