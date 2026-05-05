import { Button } from "#/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { getPostsServerFn } from "#/server/functions";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/")({
  component: RouteComponent,
  loader: async () => await getPostsServerFn(),
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-5 ml-80 mr-80 my-10">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      <div className="flex flex-col gap-5 w-lg">
        {data.length &&
          data.map((post: any) => (
            <Card key={post.slug}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.blurb}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to={`/blog/${post.slug}`}>
                  <Button variant="outline">Read More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
