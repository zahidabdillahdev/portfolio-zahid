import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import pool, { isConfigured } from "@/lib/db";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
};

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export async function getPosts(customPath = ["src", "app", "work", "projects"]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  const staticPosts = getMDXData(postsDir);

  // If we are looking for projects, also check database
  if (isConfigured && customPath.includes("work") && customPath.includes("projects")) {
    try {
      const { rows } = await pool!.query("SELECT * FROM projects ORDER BY published_at DESC");
      const dbPosts = rows.map((row) => ({
        slug: row.slug,
        metadata: {
          title: row.title,
          subtitle: "",
          publishedAt: row.published_at.toISOString().split("T")[0],
          summary: row.description || "",
          image: row.cover_image || "",
          images: row.images || [],
          tag: row.tags || [],
          team: [],
          link: "",
        },
        content: row.content,
      }));

      // Merge: DB overrides static with same slug
      const mergedMap = new Map();
      staticPosts.forEach((p) => mergedMap.set(p.slug, p));
      dbPosts.forEach((p) => mergedMap.set(p.slug, p));

      return Array.from(mergedMap.values());
    } catch (err) {
      console.error("Error fetching from DB:", err);
      return staticPosts;
    }
  }

  return staticPosts;
}
