import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "@/lib/s3";
import pool, { isConfigured } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  if (!isConfigured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    const result = await pool!.query("SELECT * FROM media ORDER BY created_at DESC");
    return NextResponse.json(result.rows || []);
  } catch (err: any) {
    console.error("CRITICAL DATABASE ERROR:", err.message);
    return NextResponse.json({ 
      error: err.message,
      detail: "Make sure you have run the SQL script in CloudBeaver to create the 'media' table."
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isConfigured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileId = uuidv4();
    const extension = file.name.split(".").pop();
    const fileName = `${fileId}.${extension}`;
    const bucketName = process.env.R2_BUCKET_NAME;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
      })
    );

    const publicUrl = `${process.env.R2_PUBLIC_DOMAIN}/${fileName}`;

    const { rows } = await pool!.query(
      `INSERT INTO media (url, filename, mime_type, size) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [publicUrl, file.name, file.type, file.size]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (err: any) {
    console.error("UPLOAD ERROR:", err.message);
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

    const { rows } = await pool!.query("SELECT * FROM media WHERE id = $1", [id]);
    if (rows.length === 0) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    const media = rows[0];
    const fileName = media.url.split("/").pop();

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileName,
      })
    );

    await pool!.query("DELETE FROM media WHERE id = $1", [id]);

    return NextResponse.json({ message: "Media deleted successfully" });
  } catch (err: any) {
    console.error("DELETE ERROR:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
