import { getPost, getPosts } from "#/server/functions";
import { queryOptions } from "@tanstack/react-query";

export const postsQueryOptions = () =>
  queryOptions({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });

export const postQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["post", slug],
    queryFn: () => getPost({ data: { slug } }),
  });
