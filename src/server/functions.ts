import { BlogPosts } from "#/db/schema";
import { drizzleClient } from "#/integrations/drizzle/db-client";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import matter from "gray-matter";
import { z } from "zod";

const PostQuerySchema = z.object({
  slug: z.string(),
});

export const getPosts = createServerFn().handler(async () => {
  try {
    const resp = await drizzleClient.select().from(BlogPosts);

    if (resp.length) {
      return resp.map((post) => {
        const { data, content } = matter(post.blog_content);
        return {
          slug: post.slug,
          title: post.blog_title,
          blurb: data.blurb,
          publishedAt: post.created_at,
          content,
        };
      });
    }

    return [];
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
});

export const getPost = createServerFn()
  .inputValidator(PostQuerySchema)
  .handler(async ({ data }) => {
    try {
      const resp = await drizzleClient
        .select()
        .from(BlogPosts)
        .where(eq(BlogPosts.slug, data.slug))
        .limit(1);

      if (!resp) {
        throw notFound({ routeId: "/blog/$slug" });
      }

      const post = resp[0];
      const { data: frontMatterData, content } = matter(post.blog_content);

      return {
        title: post.blog_title,
        blurb: frontMatterData.blurb,
        publishedAt: post.created_at,
        content,
      };
    } catch (error) {
      console.error("Error fetching post", error);
      throw new Error("Error fetching post");
    }
  });
