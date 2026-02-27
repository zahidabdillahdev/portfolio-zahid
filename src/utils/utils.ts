import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import pool, { isConfigured } from "@/lib/db";
import { person, social, home, about } from "@/resources/content";

// ... existing types ...

export async function getProfile() {
  if (isConfigured) {
    try {
      const { rows } = await pool!.query("SELECT * FROM profile WHERE id = 1");
      if (rows[0]) {
        const db = rows[0];
        // Merge with static defaults for fields not in DB
        return {
          person: {
            ...person,
            firstName: db.first_name || person.firstName,
            lastName: db.last_name || person.lastName,
            name: db.name || person.name,
            role: db.role || person.role,
            avatar: db.avatar || person.avatar,
            email: db.email || person.email,
            location: db.location || person.location,
            languages: db.languages || person.languages,
          },
          home: {
            ...home,
            headline: db.home_headline || home.headline,
            subline: db.home_subline || home.subline,
          },
          about: {
            ...about,
            intro: {
                ...about.intro,
                description: db.home_subline || about.intro.description,
            }
          },
          social: [
            { ...social[0], link: db.github_link || social[0].link },
            { ...social[1], link: db.linkedin_link || social[1].link },
            { ...social[2], link: db.instagram_link || social[2].link },
            ...social.slice(3)
          ]
        };
      }
    } catch (err) {
      console.error("Error fetching profile from DB:", err);
    }
  }
  return { person, social, home, about };
}

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

export type Post = {
    slug: string;
    metadata: Metadata;
    content: string;
    isStatic?: boolean;
}

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    return [];
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

function getMDXData(dir: string): Post[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
      isStatic: true,
    };
  });
}

export async function getPosts(customPath = ["src", "app", "work", "projects"]): Promise<Post[]> {
  const postsDir = path.join(process.cwd(), ...customPath);
  const staticPosts = getMDXData(postsDir);

  // If we are looking for projects, also check database
  if (isConfigured && customPath.includes("work") && customPath.includes("projects")) {
    try {
      const { rows } = await pool!.query("SELECT * FROM projects ORDER BY published_at DESC");
      const dbPosts: Post[] = rows.map((row) => ({
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
        isStatic: false,
      }));

      // Merge: DB overrides static with same slug
      const mergedMap = new Map<string, Post>();
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
