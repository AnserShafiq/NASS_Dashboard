import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function DELETE (request: Request, {params} : {params: {id: string}}){
    try{
        const {id} = await params
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