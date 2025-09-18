import { marked } from "marked";
import { timestampToLocaleDateString } from "../utils/dates.ts";

export interface Article {
  id: string;
  title: string;
  slug: string;
  body: string;
  site: string;
  author: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export function BlogShow({ article }: { article: Article }) {
  return (
    <div class="container" style={{ marginTop: "7rem" }}>
      <div class="row">
        <div class="col">
          <h1>{article.title}</h1>
          <p class="card-text mb-0">
            <small class="text-muted">
              {`By: ${article.author.firstName} ${article.author.lastName}`}
            </small>
          </p>
          <p class="card-text my-0">
            <small class="text-muted">
              {`Posted At: ${timestampToLocaleDateString(article.createdAt)}`}
            </small>
          </p>
          <p class="card-text mt-0">
            <small class="text-muted">
              {`Updated At: ${timestampToLocaleDateString(article.updatedAt)}`}
            </small>
          </p>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col">
          <div
            dangerouslySetInnerHTML={{ __html: marked(article.body) }}
          />
        </div>
      </div>
    </div>
  );
}
