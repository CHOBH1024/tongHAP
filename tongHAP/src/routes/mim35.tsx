import { createFileRoute } from '@tanstack/react-router';
import { MIM35App } from '../apps/mim35/routes/index';
import '../apps/mim35/styles.css';

export const Route = createFileRoute('/mim35')({
  component: MIM35Page,
});

function MIM35Page() {
  return <MIM35App />;
}
