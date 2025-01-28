import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function DELETE (request: Request, {params}: {params: {id: string}}){
    try{
        const {id} = params

        await sql`DELETE FROM AGENTS WHERE agent_id = ${id}`

        return NextResponse.json({message:'User got deleted', status: 200});
    }catch{
        console.error('Unable to delete a User.')
    }
}