import * as Marked from "marked";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markdown";

export interface MarkdownHeading {
  id: string;
  html: string;
  level: number;
}

export interface MarkdownOptions {
  inline?: boolean;
}

class DefaultRenderer extends Marked.Renderer {
  headings: MarkdownHeading[] = [];

  override text(token: Marked.Tokens.Text | Marked.Tokens.Escape): string {
    if (
      token.type === "text" &&
      "tokens" in token &&
      token.tokens !== undefined
    ) {
      return this.parser.parseInline(token.tokens);
    }

    // Smartypants typography enhancement
    return token.text
      .replaceAll("...", "&#8230;")
      .replaceAll("--", "&#8212;")
      .replaceAll("---", "&#8211;")
      .replaceAll(/(\w)'(\w)/g, "$1&#8217;$2")
      .replaceAll(/s'/g, "s&#8217;")
      .replaceAll("&#39;", "&#8217;")
      .replaceAll(/["](.*?)["]/g, "&#8220;$1&#8221")
      .replaceAll(/&quot;(.*?)&quot;/g, "&#8220;$1&#8221")
      .replaceAll(/['](.*?)[']/g, "&#8216;$1&#8217;");
  }

  override code({ text, lang }: Marked.Tokens.Code): string {
    const language = lang ? lang.toLowerCase() : "plaintext";
    const grammar = Prism.languages[language] || Prism.languages.plaintext;
    const highlighted = Prism.highlight(text, grammar, language);
    return `<pre class="language-${language}"><code>${highlighted}</code></pre>`;
  }
}

export function renderMarkdown(
  markdown: string,
  opts: MarkdownOptions = {},
): { headings: MarkdownHeading[]; html: string } {
  const renderer = new DefaultRenderer();
  const markedOpts: Marked.MarkedOptions & { async: false } = {
    gfm: true,
    async: false,
    renderer,
  };

  try {
    const html = opts.inline
      ? Marked.parseInline(markdown, markedOpts)
      : Marked.parse(markdown, markedOpts);

    return { headings: renderer.headings, html };
  } catch (err) {
    throw new Error(
      `Error rendering markdown: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}
