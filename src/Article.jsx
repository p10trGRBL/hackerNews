import { useEffect } from "react";
import "./Article.css";

export default function Article({ article, index }) {
  let url = article.url;
  if (!article.title) {
    if (article.parent_id) {
      article.title = `https://news.ycombinator.com/item?id=${article.parent_id}`;
      url = `https://news.ycombinator.com/item?id=${article.parent_id}`;
    }
  }
  
  let domain = "";
  if (url) {
    domain = url.split("/");
    domain = domain[2];
    if (domain.startsWith("www.")) {
      domain = domain.substring(4);
    }
  }

  useEffect(() => {}, []);

  return (
    <div className="article">
      <span className="first_line">
        <span className="index">{index + 1}</span>
        <a className="title" href={url || ""}>
          {article.title}
        </a>
        <a className="domain" href={`https://${domain}` || ""}>
          ({domain || ""})
        </a>
      </span>

      <span className="second_line">
        <span className="points">{article.points} points | </span>
        <a
          href={"https://news.ycombinator.com/item?id=" + article.objectID}
          className="comments"
        >
          {" "}
          {article.num_comments} comments{" "}
        </a>
      </span>
    </div>
  );
}
