import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const DoraemonApp = lazy(() => import('../apps/doraemon/App').then(m => ({ default: m.DoraemonApp })));

export const Route = createFileRoute('/doraemon')({
  component: DoraemonPage,
});

function DoraemonPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#0891b2', borderTopColor: 'transparent' }} /></div>}>
      <DoraemonApp />
    </Suspense>
  );
}
