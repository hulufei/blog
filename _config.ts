import lume from "lume/mod.ts";
import feed from "lume/plugins/feed.ts";
import date from "lume/plugins/date.ts";
import texmath from "npm:markdown-it-texmath";
import katex from "npm:katex@0.16.9";

const markdown = {
  plugins: [
    [texmath, {
      engine: katex,
      // Compatible with peek.nvim, order matters
      delimiters: ["gitlab", "dollars"],
      katexOptions: {
        output: "mathml",
        macros: { "\\R": "\\mathbb{R}" },
      },
    }],
  ],
};

const site = lume(
  {
    location: new URL("https://blog.hulufei.top"),
    emptyDest: false,
    server: {
      open: true,
    },
  },
  {
    markdown,
    search: {
      returnPageData: true,
    },
  },
);

site.copy("static");

site.use(date());

site.use(
  feed({
    output: ["/feed.xml"],
    query: "type=post",
    info: {
      title: "Huiliu's Blog",
      description: "A blog about programming, life, and everything.",
      date: new Date(),
    },
    items: {
      title: "=title",
      description: "=excerpt",
      date: "=date",
      content: "=children",
    },
  }),
);

site.preprocess([".html"], (page) => {
  // Extract the first paragraph as excerpt
  const content = page.data.content as string;
  const paragraphs = content.split(/\n{2,}/);
  page.data.excerpt = paragraphs[0];
});

export default site;
