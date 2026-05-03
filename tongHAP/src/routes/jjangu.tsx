import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const JjanguApp = lazy(() => import('../apps/jjangu/App').then(m => ({ default: m.JjanguApp })));

export const Route = createFileRoute('/jjangu')({
  component: JjanguPage,
});

function JjanguPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#ea580c', borderTopColor: 'transparent' }} /></div>}>
      <JjanguApp />
    </Suspense>
  );
}
