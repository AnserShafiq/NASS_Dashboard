import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";


export async function GET(request: Request, {params} : {params: {id: string}}){
    try{
        const {id} = await params;
        const query = {
            text: `SELECT * FROM USER_PROFILES WHERE id=$1`,
            values: [id],
        }
        const result = await sql.query(query)
        console.log(result.rows[0])
        return NextResponse.json(result.rows[0])
    }catch{
        console.error('Unable to find in Database')
    }
}