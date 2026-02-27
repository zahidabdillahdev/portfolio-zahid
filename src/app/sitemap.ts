import { getPosts } from "@/utils/utils";
import { baseURL } from "@/resources";

export default async function sitemap() {
  const blogs = (await getPosts(["src", "app", "blog", "posts"])).map((post) => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const works = (await getPosts(["src", "app", "work", "projects"])).map((post) => ({
    url: `${baseURL}/work/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ["", "/about", "/blog", "/work", "/gallery"].map((route) => ({
    url: `${baseURL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs, ...works];
}
