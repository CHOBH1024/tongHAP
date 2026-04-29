import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import '../apps/mim25/styles.css';

const MIM25App = lazy(() => import('../apps/mim25/routes/index').then(m => ({ default: m.MIM25App })));

export const Route = createFileRoute('/mim25')({
  component: MIM25Page,
});

function MIM25Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f2f4f6]"><div className="w-8 h-8 border-4 border-[#1e1b4b] border-t-transparent rounded-full animate-spin" /></div>}>
      <MIM25App />
    </Suspense>
  );
}
