import { NextRequest, NextResponse } from "next/server";
import pool, { isConfigured } from "@/lib/db";

export async function GET() {
  if (!isConfigured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    const { rows } = await pool!.query("SELECT * FROM profile WHERE id = 1");
    return NextResponse.json(rows[0] || {});
  } catch (err: any) {
    console.error("Error fetching profile:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isConfigured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    const body = await req.json();
    console.log("UPDATING PROFILE WITH BODY:", body);
    const fields = [
      'first_name', 'last_name', 'name', 'role', 'avatar', 'email', 
      'location', 'languages', 'github_link', 'linkedin_link', 
      'instagram_link', 'threads_link', 'home_headline', 'home_subline'
    ];
    
    const sets = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
    const values = fields.map(f => body[f]);

    const query = `
      INSERT INTO profile (id, ${fields.join(', ')})
      VALUES (1, ${fields.map((_, i) => `$${i + 1}`).join(', ')})
      ON CONFLICT (id) DO UPDATE
      SET ${sets}, updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;

    const { rows } = await pool!.query(query, values);
    return NextResponse.json(rows[0]);
  } catch (err: any) {
    console.error("Error updating profile:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
