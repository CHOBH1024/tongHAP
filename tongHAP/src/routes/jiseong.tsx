import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const JiseongApp = lazy(() => import('../apps/jiseong/App').then(m => ({ default: m.JiseongApp })));

export const Route = createFileRoute('/jiseong')({
  component: JiseongPage,
});

function JiseongPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#2563eb', borderTopColor: 'transparent' }} /></div>}>
      <JiseongApp />
    </Suspense>
  );
}
