import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/utils/db";

export async function POST(req: NextRequest) {
  try {
    console.log("/api/save-user called");

    const body = await req.json();
    console.log("Received:", body);

    const {
      id,
      first_name,
      last_name,
      username,
      language_code,
      is_premium,
      photo_url,
      jwt,
    } = body;

    await pool.query(
      `INSERT INTO telegram_user (id, first_name, last_name, username, language_code, is_premium, photo_url, jwt)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (id) DO UPDATE SET 
         first_name = EXCLUDED.first_name,
         last_name = EXCLUDED.last_name,
         username = EXCLUDED.username,
         language_code = EXCLUDED.language_code,
         is_premium = EXCLUDED.is_premium, 
         photo_url = EXCLUDED.photo_url, 
         jwt = EXCLUDED.jwt`,

      [id, first_name, last_name, username, language_code, is_premium, photo_url, jwt]
    );

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json(
      { status: "error", message: String(error) },
      { status: 500 }
    );
  }
}
