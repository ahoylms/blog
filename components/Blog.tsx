import { timestampToLocaleDateString } from "../utils/dates.ts";

export interface Article {
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

export function Blog({ articles }: { articles: Article[] }) {
  return (
    <div class="container vh-100" style={{ marginTop: "7rem" }}>
      <div class="row">
        <div class="col">
          <h2 class="mt-7 mb-3 text-center">
            Blog
          </h2>
        </div>
      </div>
      <div class="row justify-content-center">
        {articles.filter((x) => ["ahoy", "all"].includes(x.site)).map((a) => (
          <div class="col-sm-12 col-md-8 col-lg-6 mb-4">
            <a href={`/blog/${a.slug}`} class="text-decoration-none text-dark">
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title">{a.title}</h5>
                  <div class="card-text short-text">
                    <div
                      className="p-3 overflow-auto"
                      style={{
                        height: "100%",
                        fontSize: "1.1rem",
                      }}
                    />
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="text-muted mb-0">
                      By: {a.author.firstName} {a.author.lastName} | Posted At {timestampToLocaleDateString(a.createdAt)}
                    </div>
                    <div>
                      <button class="btn btn-primary read-more">Read</button>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
