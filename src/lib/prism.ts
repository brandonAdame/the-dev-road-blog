import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";

Prism.languages["txt-files"] = {
  comment: {
    pattern: /#.*|$/,
    greedy: true,
  },
  operator: /├──|└──|│\s+ /,
  root: {
    pattern: /<root>|<project root>/,
    alias: "function",
  },
};

export { Prism };
