import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"


export async function POST(request:Request){
    const formData = await request.json()
    console.log(formData)
    // await sql`
    // CREATE TABLE IF NOT EXISTS MANAGERS(
    // MANAGER_ID TEXT NOT NULL PRIMARY KEY UNIQUE,
    // NAME TEXT NOT NULL,
    // EMAIL TEXT NOT NULL UNIQUE,
    // PASSWORD TEXT NOT NULL,
    // CONTACT_NUMBER TEXT NOT NULL,
    // GENDER TEXT NOT NULL,
    // COMPANIES TEXT[],
    // AGENTS_ASSIGNED INT,
    // CREATED_BY TEXT NOT NULL,
    // CREATED_ON TIMESTAMP NOT NULL
    // )
    // `

    const managers_count = await sql`select count(*) from manager_users`
    const number = String(parseInt(managers_count.rows[0].count)+1).padStart(4,'0')
    const manager_id = `NASS_MN_${number}`
    const query = {
        text: `INSERT INTO MANAGER_USERS(
        MANAGER_ID, NAME, EMAIL, PASSWORD, CONTACT_NUMBER, GENDER, 
        COMPANIES,AGENTS_ASSIGNED, CREATED_BY, CREATED_ON
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW())`,
        values: [
            manager_id,
            formData['name'],
            formData['email'],
            formData['password'],
            formData['contact_number'],
            formData['gender'],
            formData['companies'],
            // `{${formData.getAll('companies')}}`,
            formData['agents_assigned'],
            formData['created_by'],
        ]
    }
    await sql.query(query)

    return NextResponse.json({message: 'Done'}, {status: 200})
}

export async function GET() {
    const managers_count = await sql`SELECT * FROM MANAGER_USERS`
    // console.log('==>', managers_count.rows)
    return NextResponse.json(managers_count.rows)
}