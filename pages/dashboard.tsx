import { useAuth } from "@lib/auth";
import EmptyState from "@components/EmptyState";

export default function Home(): JSX.Element {
  const auth = useAuth();
  if (!auth.user) {
    return <p>Loading...</p>;
  }

  return <EmptyState />;
}
