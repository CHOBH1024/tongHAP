import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const BabySharkApp = lazy(() => import('../apps/baby-shark/App').then(m => ({ default: m.BabySharkApp })));

export const Route = createFileRoute('/baby-shark')({
  component: BabySharkPage,
});

function BabySharkPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#4f46e5', borderTopColor: 'transparent' }} /></div>}>
      <BabySharkApp />
    </Suspense>
  );
}
