import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { excelData } = body;

    if (!excelData || !Array.isArray(excelData)) {
      return NextResponse.json(
        { error: "Invalid Data Format" },
        { status: 400 }
      );
    }

    await sql.query("BEGIN");

    for (const row of excelData) {
      const query = `
        INSERT INTO USER_PROFILES (user_name, user_email, password, created_at) 
        VALUES ($1, $2, $3, NOW())
      `;
      await sql.query(query, [row.user_name, row.user_email, row.password]);
    }

    await sql.query("COMMIT");
    return NextResponse.json(
      { message: "Successfully added to the database" },
      { status: 200 }
    );
  } catch (error) {
    await sql.query("ROLLBACK");
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to insert data into the database" },
      { status: 500 }
    );
  }
}
