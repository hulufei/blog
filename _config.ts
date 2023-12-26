import lume from "lume/mod.ts";
import feed from "lume/plugins/feed.ts";
import date from "lume/plugins/date.ts";
import katex, { defaults } from "lume/plugins/katex.ts";

const site = lume(
  {
    location: new URL("https://blog.hulufei.top"),
    emptyDest: false,
    server: {
      open: true,
    },
  },
  {
    search: {
      returnPageData: true,
    },
  },
);

site.copy("static");

site.use(date());
site.use(katex({
  options: {
    output: "mathml",
    delimiters: [
      // @ts-ignore: delimiters is an array
      ...defaults.options.delimiters,
      // LaTeX uses $…$, but it ruins the display of normal `$` in text:
      // { left: "$", right: "$", display: false },
      { left: "\\$", right: "\\$", display: false },
    ],
  },
}));

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
