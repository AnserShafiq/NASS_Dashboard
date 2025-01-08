// In this file we are reading data from database and displaying it on hosting/query

import { db } from "@vercel/postgres";

const client = await db.connect()

async function listUsers(){
    const data = await client.sql`
        SELECT * FROM tabletwo
    `
    return data.rows;
}

export async function GET(){
    try{
        return Response.json(await listUsers());
    }catch(err){
        return console.log(err);
    }
}