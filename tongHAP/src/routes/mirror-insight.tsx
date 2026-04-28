import { createFileRoute } from '@tanstack/react-router';
import MirrorInsightApp from '../apps/mirror-insight/MirrorInsightApp';

export const Route = createFileRoute('/mirror-insight')({
  component: MirrorInsightPage,
});

function MirrorInsightPage() {
  return <MirrorInsightApp />;
}
