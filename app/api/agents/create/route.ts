import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";


export async function POST(request: Request){
    const formData = await request.formData()
    console.log('From APi: ',formData)

    // await sql`CREATE TABLE IF NOT EXISTS AGENTS (
    // AGENT_ID TEXT PRIMARY KEY UNIQUE NOT NULL,
    // NAME TEXT NOT NULL,
    // GENDER TEXT NOT NULL,
    // EMAIL TEXT UNIQUE NOT NULL,
    // ASSIGNED_COMPANY TEXT NOT NULL,
    // MANAGER_ID TEXT NOT NULL,
    // PASSWORD TEXT NOT NULL,
    // CREATED_ON TIMESTAMP NOT NULL
    // )`

    const count = await sql`SELECT COUNT(*) FROM AGENTS`
    const usernumber = String(parseInt(count.rows[0].count)+1).padStart(6,'0')
    console.log(count.rows[0])
    const agent_id= `NASS_AG_${usernumber}`
    console.log(formData.getAll('assigned'),typeof(formData.get('assigned')))
    const query= {
        text: `INSERT INTO AGENTS (AGENT_ID, NAME, GENDER, EMAIL, ASSIGNED_COMPANY, MANAGER_ID,PASSWORD,CREATED_ON, COMPANIES) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,NOW(),$8)`,
        values: [
            agent_id, 
            formData.get('name'), 
            formData.get('gender'), 
            formData.get('email'), 
            formData.get('assigned'), 
            formData.get('manager'),
            formData.get('password'),
            `{${formData.getAll('assigned')}}`
        ]
    }
    await sql.query(query)

    return NextResponse.json( {message:'From api'},{status: 200})
}