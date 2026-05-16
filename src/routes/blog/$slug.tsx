import { strapiPostQueryOptions } from "#/ts-query/posts";
import { createFileRoute } from "@tanstack/react-router";
import markdownCss from "@/styles/markdown.css?url";
import prismCss from "@/styles/prism.css?url";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism } from "#/lib/prism";
import { getStrapiMedia } from "#/lib/strapi";

export const Route = createFileRoute("/blog/$slug")({
  component: RouteComponent,
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(strapiPostQueryOptions(params.slug)),
  notFoundComponent: () => <div>Post not found</div>,
  errorComponent: () => <div>Error while trying to fetch post</div>,
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

function MarkdownRenderer({ content }: { content: string }) {
  return (
    <section>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            const code = String(children).replace(/\n$/, "");

            if (match) {
              const language = match[1].toLowerCase();
              const grammar =
                Prism.languages[language] || Prism.languages.plaintext;
              const highlighted = Prism.highlight(code, grammar, language);
              return <code dangerouslySetInnerHTML={{ __html: highlighted }} />;
            }
            return (
              <code className={className} {...rest}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </section>
  );
}

function BlockRenderer(blocks: any) {
  return blocks.map((block: any, index: number) => {
    return <MarkdownRenderer key={index} content={block.body} />;
  });
}

function RouteComponent() {
  const data = Route.useLoaderData();
  const coverUrl = getStrapiMedia(data.cover.url);

  return (
    <div className="rich-text space-y-6 max-w-3xl mx-auto my-10">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
        <img
          src={coverUrl ?? undefined}
          alt={data.cover.alternativeText ?? undefined}
          className="object-cover w-full h-full"
        />
      </div>
      <h1 className="text-4xl font-bold">{data.title}</h1>
      {BlockRenderer(data.blocks)}
    </div>
  );
}
