import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/verify-email")({
  component: () => <Page />,
});

function Page() {
  return (
    <div>
      <span>All done please check your email to verify your account. </span>
      <Link
        to="/sign-in"
        className="mt-4 font-bold text-purple-600 hover:text-purple-500 hover:underline"
      >
        Go to sign in
      </Link>
    </div>
  );
}
