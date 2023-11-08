import lume from "lume/mod.ts";
import feed from "lume/plugins/feed.ts";
import date from "lume/plugins/date.ts";

const site = lume(
  {
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

export default site;
