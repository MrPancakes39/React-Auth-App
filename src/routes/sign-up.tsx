import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-up")({
  component: () => <Page />,
});

function Page() {
  return (
    <div className="grid h-screen place-content-center">
      <SignUp />
    </div>
  );
}

function SignUp() {
  return (
    <form className="mb-20 flex w-[400px] max-w-[calc(-2.5rem_+_100vw)] flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-300 bg-gray-100 shadow-lg">
      <div className="flex w-full flex-col gap-8 rounded-b-lg border-b bg-white p-10">
        <div className="text-center">
          <h1 className="text-base font-bold text-gray-800">
            Create your account
          </h1>
          <p className="text-sm text-gray-500">
            Welcome! Please fill in the details to get started.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="max-h-8 rounded-md border border-gray-300 px-1.5 py-3 text-sm outline-none focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-300 hover:border-gray-400"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="max-h-8 rounded-md border border-gray-300 px-1.5 py-3 text-sm outline-none focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-300 hover:border-gray-400"
            />
          </div>
        </div>
        <button
          type="button"
          className="transition- rounded-md border border-violet-600 bg-violet-500 px-3 py-2 text-sm text-white outline-none focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-300 hover:bg-violet-400"
        >
          Continue
        </button>
      </div>
      <div className="w-full p-4 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          to="/sign-in"
          className="font-bold text-purple-600 hover:text-purple-500 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
}
