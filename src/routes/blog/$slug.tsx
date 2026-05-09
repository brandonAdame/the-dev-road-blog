import { postQueryOptions } from "#/ts-query/posts";
import { createFileRoute } from "@tanstack/react-router";
import markdownCss from "@/styles/markdown.css?url";
import prismCss from "@/styles/prism.css?url";

export const Route = createFileRoute("/blog/$slug")({
  component: RouteComponent,
  loader: async ({ context, params }) =>
    await context.queryClient.ensureQueryData(postQueryOptions(params.slug)),
  notFoundComponent: () => <div>Post not found</div>,
  head: () => ({
    links: [
      {
        rel: "stylesheet",
        href: markdownCss,
      },
      {
        rel: "stylesheet",
        href: prismCss,
      },
    ],
  }),
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <div>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: data.html }}
      />
    </div>
  );
}
