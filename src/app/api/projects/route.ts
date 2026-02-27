import { NextRequest, NextResponse } from "next/server";
import pool, { isConfigured } from "@/lib/db";

export async function POST(req: NextRequest) {
  if (!isConfigured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    const { title, slug, description, content, publishedAt, cover_image, images, tags } = await req.json();

    const { rows } = await pool!.query(
      `INSERT INTO projects (title, slug, description, content, published_at, cover_image, images, tags) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [title, slug, description, content, publishedAt, cover_image || null, images || [], tags || []]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (err: any) {
    console.error("Error creating project:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isConfigured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    const { title, slug, description, content, publishedAt, cover_image, images, tags } = await req.json();

    const { rows } = await pool!.query(
      `UPDATE projects 
       SET title = $1, description = $2, content = $3, published_at = $4, cover_image = $5, images = $6, tags = $7, updated_at = CURRENT_TIMESTAMP
       WHERE slug = $8
       RETURNING *`,
      [title, description, content, publishedAt, cover_image || null, images || [], tags || [], slug]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (err: any) {
    console.error("Error updating project:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isConfigured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const { rowCount } = await pool!.query("DELETE FROM projects WHERE slug = $1", [slug]);

    if (rowCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (err: any) {
    console.error("Error deleting project:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
