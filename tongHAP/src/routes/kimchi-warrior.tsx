import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const KimchiWarriorApp = lazy(() => import('../apps/kimchi-warrior/App').then(m => ({ default: m.KimchiWarriorApp })));

export const Route = createFileRoute('/kimchi-warrior')({
  component: KimchiWarriorPage,
});

function KimchiWarriorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#dc2626', borderTopColor: 'transparent' }} /></div>}>
      <KimchiWarriorApp />
    </Suspense>
  );
}
