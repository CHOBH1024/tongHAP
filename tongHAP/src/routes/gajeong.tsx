import { createFileRoute } from '@tanstack/react-router';
import { GajeongApp } from '../apps/gajeong/App';
import '../apps/gajeong/App.css';

export const Route = createFileRoute('/gajeong')({
  component: GajeongPage,
});

function GajeongPage() {
  return <GajeongApp />;
}
