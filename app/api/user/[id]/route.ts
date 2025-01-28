import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function DELETE (request: Request, context: {params: {id: string}}){
    try{
        const {id} = context.params;
        const query = {
            text: 'DELETE FROM AGENTS WHERE agent_id = $1',
            values: [id]
        }
        await sql.query(query)
        return NextResponse.json({message:'User got deleted', status: 200});
    }catch{
        console.error('Unable to delete a User.')
    }
}