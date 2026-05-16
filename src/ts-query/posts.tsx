import { getPost, getPosts } from "#/server/functions";
import { fetchStrapiPost, fetchStrapiPosts } from "#/server/strapi-functions";
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

export const strapiPostsQueryOptions = () =>
  queryOptions({
    queryKey: ["strapi-posts"],
    queryFn: () => fetchStrapiPosts(),
  });

export const strapiPostQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["strapi-post", slug],
    queryFn: () => fetchStrapiPost({ data: { slug } }),
  });
