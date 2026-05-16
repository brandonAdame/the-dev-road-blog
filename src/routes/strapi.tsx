import { Button } from "#/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { strapiPostsQueryOptions } from "#/ts-query/posts";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/strapi")({
  component: RouteComponent,
  loader: async ({ context }) =>
    await context.queryClient.ensureQueryData(strapiPostsQueryOptions()),
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto my-10">
      {data.data.map((post) => (
        <Card key={post.documentId}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>{post.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline">
              <Link to="/blog/$slug" params={{ slug: post.slug }}>
                Read More
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
