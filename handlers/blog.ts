import { Handlers } from "../deps.ts";
import { GraphQLClient } from "../deps.ts";
import { Article } from "../components/Blog.tsx";

const graphql_api = Deno.env.get("GRAPHQL_API") || "http://localhost:3000/graphql";

const client = new GraphQLClient(graphql_api, {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export interface Data {
  articles: Article[];
  error: string | null;
}

export const blogHandler: Handlers<Data> = {
  async GET(_, ctx) {
    const query = `
      query {
        articles {
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
      const res = await client.request(query);
      return ctx.render({ articles: res.articles, error: null });
    } catch (_e) {
      return ctx.render({ articles: [], error: "An error occurred." });
    }
  },
};
