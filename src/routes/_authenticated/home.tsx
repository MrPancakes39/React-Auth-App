import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useAuth } from "../../auth";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/home")({
  component: () => <Page />,
});

function Page() {
  const { signOut, isAuthenticated } = useAuth();
  const router = useRouter();
  const navigate = Route.useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      router.invalidate().then(() => navigate({ to: "/" }));
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="font-bold">
      <div>Hello You Are Authenticated!</div>
      <button type="button" onClick={handleLogout} className="text-red-500">
        Logout
      </button>
    </div>
  );
}
