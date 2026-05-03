import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const WooseongApp = lazy(() => import('../apps/wooseong/App').then(m => ({ default: m.WooseongApp })));

export const Route = createFileRoute('/wooseong')({
  component: WooseongPage,
});

function WooseongPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#d97706', borderTopColor: 'transparent' }} /></div>}>
      <WooseongApp />
    </Suspense>
  );
}
