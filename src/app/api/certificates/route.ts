import { NextRequest, NextResponse } from "next/server";
import pool, { isConfigured } from "@/lib/db";

export async function GET() {
  if (!isConfigured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    const { rows } = await pool!.query("SELECT * FROM certificates ORDER BY created_at DESC");
    return NextResponse.json(rows);
  } catch (err: any) {
    console.error("Error fetching certificates:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isConfigured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    const { title, issuer, issue_date, expiry_date, credential_id, credential_url, image_url } = await req.json();

    const { rows } = await pool!.query(
      `INSERT INTO certificates (title, issuer, issue_date, expiry_date, credential_id, credential_url, image_url) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [title, issuer, issue_date || null, expiry_date || null, credential_id || null, credential_url || null, image_url || null]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (err: any) {
    console.error("Error creating certificate:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isConfigured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    const { id, title, issuer, issue_date, expiry_date, credential_id, credential_url, image_url } = await req.json();

    const { rows } = await pool!.query(
      `UPDATE certificates 
       SET title = $1, issuer = $2, issue_date = $3, expiry_date = $4, credential_id = $5, credential_url = $6, image_url = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING *`,
      [title, issuer, issue_date || null, expiry_date || null, credential_id || null, credential_url || null, image_url || null, id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (err: any) {
    console.error("Error updating certificate:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isConfigured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { rowCount } = await pool!.query("DELETE FROM certificates WHERE id = $1", [id]);

    if (rowCount === 0) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Certificate deleted successfully" });
  } catch (err: any) {
    console.error("Error deleting certificate:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
