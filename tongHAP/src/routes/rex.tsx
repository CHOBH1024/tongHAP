import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const RexApp = lazy(() => import('../apps/rex/App').then(m => ({ default: m.RexApp })));

export const Route = createFileRoute('/rex')({
  component: RexPage,
});

function RexPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#16a34a', borderTopColor: 'transparent' }} /></div>}>
      <RexApp />
    </Suspense>
  );
}
