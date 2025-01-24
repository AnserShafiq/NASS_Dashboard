import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Start a transaction
    await sql.query("BEGIN");

    // First Query
    const query1 = {
      text: `
        INSERT INTO DAILY_DIALS(
          TOTAL_CALLS, 
          CALLS_CONNECTED, 
          CALLS_REJECTED, 
          POSITIVE_CALLS, 
          NEGATIVE_CALLS, 
          DATE, 
          AGENT_ID
        )
        VALUES ($1, $2, $3, $4, $5, NOW(), $6)
      `,
      values: [
        data["total_calls"],
        data["calls_connected"],
        data["calls_rejected"],
        data["positive_calls"],
        data["negative_calls"],
        data["agent_id"],
      ],
    };
    await sql.query(query1);

    // Second Query
    const query2 = {
      text: `
        INSERT INTO DAILY_EMAILS(
          SENT,
          OPENED,
          BOUNCED,
          DIRECT_RESPONSE,
          POSITIVE_RESPONSE,
          NEGATIVE_RESPONSE,
          DATE,
          AGENT_ID
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7)
      `,
      values: [
        data["sent"],
        data["opened"],
        data["bounced"],
        data["direct_response"],
        data["positive_responses"],
        data["negative_responses"],
        data["agent_id"],
      ],
    };
    await sql.query(query2);

    // Commit transaction
    await sql.query("COMMIT");

    return NextResponse.json(
      { message: "Successfully added new daily report" },
      { status: 200 }
    );
  } catch (error) {
    // Rollback transaction if any error occurs
    await sql.query("ROLLBACK");

    console.error("Error while inserting daily report:", error);
    return NextResponse.json(
      { message: "Unable to access database", error: error },
      { status: 500 }
    );
  }
}
