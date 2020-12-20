import unified from "unified";
import parse from "remark-parse";
import remark2react from "remark-react";
import CustomLink from "./CustomLink";
import mdSlug from "remark-slug";
import classes from "../pages/docs/index.module.css";

const Documentation = ({markdown}) => {
  const content = unified()
    .use(parse)
    .use(mdSlug)
    .use(remark2react, {
      remarkReactComponents: {
        // Use CustomLink instead of <a>
        a: CustomLink,
      },
    })
    .processSync(markdown).result;

  return (
    <div className={`markdown-body ${classes.mdBody}`}>{content}</div>
  )
}

export default Documentation
