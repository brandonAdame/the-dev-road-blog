import { createServerFn } from "@tanstack/react-start";
import { readdir } from "fs/promises";
import matter from "gray-matter";
import { dirname, join } from "path";

export const getPostsServerFn = createServerFn().handler(async () => {
  const _dirname = dirname(new URL(import.meta.url).pathname);
  const POST_DIR = join(_dirname, "../content/posts");

  async function getPost(slug: string) {
    const filePath = join(POST_DIR, `${slug}.md`);

    const file = Bun.file(filePath);
    const fileContent = await file.text();
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title,
      blurb: data.blurb,
      publishedAt: data.publishedAt,
      content,
    };
  }

  try {
    const postFiles = await readdir(POST_DIR);
    return await Promise.all(
      postFiles
        .filter((f) => f.endsWith(".md"))
        .map((f) => getPost(f.replace(".md", ""))),
    );
  } catch (error) {
    console.error("Error reading posts:", error);
    return [];
  }
});
