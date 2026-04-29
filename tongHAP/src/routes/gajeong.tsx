import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import '../apps/gajeong/App.css';

const GajeongApp = lazy(() => import('../apps/gajeong/App').then(m => ({ default: m.GajeongApp })));

export const Route = createFileRoute('/gajeong')({
  component: GajeongPage,
});

function GajeongPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f2f4f6]"><div className="w-8 h-8 border-4 border-[#ca8a04] border-t-transparent rounded-full animate-spin" /></div>}>
      <GajeongApp />
    </Suspense>
  );
}
