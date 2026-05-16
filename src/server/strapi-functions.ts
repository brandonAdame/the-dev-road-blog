import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import qs from "qs";
import z from "zod";

const BASE_API_URL =
  process.env.VITE_STRAPI_BASE_API_URL || "http://localhost:1337";

interface StrapiArrayResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiResponse<T> {
  data: T;
}

interface CoverImage {
  url: string;
  alternativeText: string;
}

export type PostType = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: CoverImage;
  blocks: any[];
};

export type AboutType = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  description: string;
  blurb: string;
  blocks: any[];
};

export const getAboutPageData = createServerFn().handler(async () => {
  const path = `/api/about`;
  const url = new URL(path, BASE_API_URL);

  url.search = qs.stringify({
    populate: "*",
  });

  const resp = await fetch(url.href);

  if (!resp.ok) {
    if (resp.status === 404) {
      throw notFound({ routeId: "/about" });
    }
    throw new Error("Error fetching about page data");
  }

  return (await resp.json()) as StrapiResponse<AboutType>;
});

export const fetchStrapiPost = createServerFn()
  .inputValidator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    const path = `/api/articles`;
    const url = new URL(path, BASE_API_URL);

    url.search = qs.stringify(
      {
        populate: {
          cover: {
            fields: ["url", "alternativeText"],
          },
          blocks: {
            populate: "*",
          },
        },
        filters: {
          slug: {
            $eq: data.slug,
          },
        },
      },
      { encodeValuesOnly: true },
    );

    const resp = await fetch(url.href);

    if (!resp.ok) {
      if (resp.status === 404) {
        throw notFound({ routeId: "/blog/$slug" });
      }
      throw new Error("Error fetching post");
    }

    const postData = (await resp.json()).data[0] as PostType;

    if (!postData) {
      throw notFound({ routeId: "/blog/$slug" });
    }

    return postData;
  });

export const fetchStrapiPosts = createServerFn().handler(async () => {
  const path = "/api/articles";
  const url = new URL(path, BASE_API_URL);

  url.search = qs.stringify({
    populate: {
      cover: {
        fields: ["url", "alternativeText"],
      },
    },
  });

  const resp = await fetch(url.href);
  return (await resp.json()) as StrapiArrayResponse<PostType>;
});
