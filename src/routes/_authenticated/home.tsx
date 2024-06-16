import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/home")({
  component: () => (
    <div className="font-bold">Hello You Are Authenticated!</div>
  ),
});
