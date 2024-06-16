import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-up")({
  component: () => <div>Hello /sign-up!</div>,
});
