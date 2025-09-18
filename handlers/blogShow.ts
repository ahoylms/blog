import { Handlers } from "../deps.ts";
import { GraphQLClient } from "../deps.ts";
import { Article } from "../components/BlogShow.tsx";

const graphql_api = Deno.env.get("GRAPHQL_API") || "http://localhost:3000/graphql";

const client = new GraphQLClient(graphql_api, {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export interface Data {
  article: Article | null;
  error: string | null;
}

export const blogShowHandler: Handlers<Data> = {
  async GET(_req, ctx) {
    const { blog: slug } = ctx.params;

    const query = `
      query GetArticle($slug: String!) {
        article(slug: $slug) {
          id
          title
          slug
          body
          site
          author {
            firstName
            lastName
          }
          createdAt
          updatedAt
        }
      }
    `;

    try {
      const res = await client.request<{ article: Article }>(query, { slug });
      return ctx.render({ article: res.article, error: null });
    } catch (_e) {
      return ctx.render({ article: null, error: "An error occurred." });
    }
  },
};
