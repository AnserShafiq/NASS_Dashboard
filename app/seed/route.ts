// In this file we are creating new tables in the database.

import { db } from "@vercel/postgres";
import { users } from "../lib/sampleDataForDB";
import bcrypt from 'bcrypt'

const client = await db.connect()

async function seedUsers() {
    await client.sql` CREATE EXTENSION IF NOT EXISTS "uuid-ossp" `;

    await client.sql`
        CREATE TABLE IF NOT EXISTS tableTwo(
            id TEXT NOT NULL unique PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL unique,
            password TEXT NOT NULL
        );
    `;

    const insertUser = await Promise.all(
        users.map(
            async(user) => {
                const encryptedPass =await bcrypt.hash(user.password, 10)
                await client.sql`
                INSERT INTO tableTwo (id,name,email,password) VALUES (${user.id},${user.name},${user.email},${encryptedPass}) ON CONFLICT (email) DO NOTHING
                `
            }
        )
    )
    return insertUser;

}

export async function GET(){
    try{
        await client.sql`BEGIN`;
        await seedUsers();
        await client.sql`COMMIT`;
        return Response.json({Message: 'Database got updated'});
    }catch(err){
        await client.sql`ROLLBACK`;
        return Response.json(
            {err}, {status:500}
        );
    }
}