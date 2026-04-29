import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import '../apps/mim35/styles.css';

const MIM35App = lazy(() => import('../apps/mim35/routes/index').then(m => ({ default: m.MIM35App })));

export const Route = createFileRoute('/mim25')({
  component: MIM35Page,
});

function MIM35Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f2f4f6]"><div className="w-8 h-8 border-4 border-[#1e1b4b] border-t-transparent rounded-full animate-spin" /></div>}>
      <MIM35App />
    </Suspense>
  );
}
