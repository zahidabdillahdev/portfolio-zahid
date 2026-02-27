import { getPosts } from "@/utils/utils";
import { baseURL, person } from "@/resources";

export async function GET() {
  const posts = await getPosts(["src", "app", "blog", "posts"]);

  const itemsXml = posts
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
    .map(
      (post) => `<item>
          <title>${post.metadata.title}</title>
          <link>${baseURL}/blog/${post.slug}</link>
          <description>${post.metadata.summary || ""}</description>
          <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
        </item>`,
    )
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${person.name}'s Portfolio</title>
        <link>${baseURL}</link>
        <description>${person.name}'s Blog RSS Feed</description>
        ${itemsXml}
      </channel>
    </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
