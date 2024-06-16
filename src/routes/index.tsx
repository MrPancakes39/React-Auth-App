import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <Page />,
});

function Page() {
  return (
    <div className="grid h-screen place-content-center">
      <div className="w-96 rounded-lg border-2 border-gray-300 p-4 shadow-md">
        <h1 className="mb-4 text-center text-4xl font-bold">
          Supabase Auth Test
        </h1>
        <p className="text-m mb-9 text-center">
          This is a test of the Supabase Auth API. To continue please sign in or
          sign up.
        </p>
        <div className="align-center flex justify-around">
          <Link
            to="/sign-in"
            className="rounded-lg bg-purple-500 px-5 py-3 uppercase text-white hover:bg-purple-600"
          >
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="rounded-lg bg-purple-500 px-5 py-3 uppercase text-white hover:bg-purple-600"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
