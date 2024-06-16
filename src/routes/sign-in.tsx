import {
  Link,
  createFileRoute,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { z } from "zod";
import { useEffect, useRef } from "react";
import { useAuth } from "../auth";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const fallback = "/home" as const;

export const Route = createFileRoute("/sign-in")({
  component: () => <Page />,
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
});

function Page() {
  return (
    <div className="grid h-screen place-content-center">
      <SignIn />
    </div>
  );
}

type FormInputs = {
  email: () => string;
  password: () => string;
};

function SignIn() {
  const { signIn, isAuthenticated } = useAuth();
  const router = useRouter();
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  useEffect(() => {
    if (isAuthenticated) {
      router
        .invalidate()
        .then(() => navigate({ to: search.redirect || fallback }));
    }
  }, [isAuthenticated]);

  const formInputs = useRef<FormInputs>({
    email: () => "",
    password: () => "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = formSchema.safeParse({
      email: formInputs.current.email(),
      password: formInputs.current.password(),
    });
    if (result.error) {
      console.error("Invalid form data");
      return;
    }
    const error = await signIn(result.data);
    if (error) {
      console.error("Error signing in");
      return;
    }
    console.log("Signed in successfully");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-20 flex w-[400px] max-w-[calc(-2.5rem_+_100vw)] flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-300 bg-gray-100 shadow-lg"
    >
      <div className="flex w-full flex-col gap-8 rounded-b-lg border-b bg-white p-10">
        <div className="text-center">
          <h1 className="text-base font-bold text-gray-800">
            Sign in to APP_NAME
          </h1>
          <p className="text-sm text-gray-500">
            Welcome back! Please sign in to continue
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
              ref={(e) =>
                (formInputs.current = {
                  ...formInputs.current,
                  email: () => e?.value ?? "",
                })
              }
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
              ref={(e) =>
                (formInputs.current = {
                  ...formInputs.current,
                  password: () => e?.value ?? "",
                })
              }
              type="password"
              id="password"
              className="max-h-8 rounded-md border border-gray-300 px-1.5 py-3 text-sm outline-none focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-300 hover:border-gray-400"
            />
          </div>
        </div>
        <button className="transition- rounded-md border border-violet-600 bg-violet-500 px-3 py-2 text-sm text-white outline-none focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-300 hover:bg-violet-400">
          Continue
        </button>
      </div>
      <div className="w-full p-4 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link
          to="/sign-up"
          className="font-bold text-purple-600 hover:text-purple-500 hover:underline"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
}
