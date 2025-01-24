import { db } from "@vercel/postgres";
import { users, images } from "../lib/sampleDataForDB";
import bcrypt from "bcrypt";

const client = await db.connect();

async function seedUsers() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
        CREATE TABLE IF NOT EXISTS tableTwo (
            id TEXT NOT NULL unique PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );
    `;

    await Promise.all(
        users.map(async (user) => {
            const encryptedPass = await bcrypt.hash(user.password, 10);
            await client.sql`
                INSERT INTO tableTwo (id, name, email, password) 
                VALUES (${user.id}, ${user.name}, ${user.email}, ${encryptedPass})
                ON CONFLICT (email) DO NOTHING;
            `;
        })
    );
}

async function seedUserImages() {
    await client.sql`
        CREATE TABLE IF NOT EXISTS UserImages (
            id TEXT NOT NULL unique PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            data BYTEA,
            createdAt TIMESTAMP NOT NULL
        );
    `;

    await Promise.all(
        images.map(async (image) => {
            await client.sql`
                INSERT INTO UserImages (id, title, data, createdAt) 
                VALUES (${image.id}, ${image.title}, ${image.data}, ${image.createdAt});
            `;
        })
    );
}

async function createNewUsersTable(){
    await client.sql`CREATE TABLE IF NOT EXISTS USER_PROFILES(
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_name TEXT NOT NULL,
        user_email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        profile_pic BYTEA,
        pic_type TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL
    );
    `;
}

async function createDailyDialsTable(){
    await client.sql`
    CREATE TABLE IF NOT EXISTS DAILY_DIALS(
    dial_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    total_calls INT NOT NULL,
    calls_connected INT NOT NULL,
    calls_rejected INT NOT NULL,
    positive_calls INT NOT NULL,
    negative_calls INT NOT NULL,
    date TIMESTAMP NOT NULL,
    agent_id TEXT NOT NULL
    )
    `
}

async function createDailyEmailsTable(){
    await client.sql`
        CREATE TABLE IF NOT EXISTS DAILY_EMAILS(
            MAIL_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            SENT INT NOT NULL ,
            OPENED INT NOT NULL,
            BOUNCED INT NOT NULL,
            DIRECT_RESPONSE INT NOT NULL,
            POSITIVE_RESPONSE INT NOT NULL,
            NEGATIVE_RESPONSE INT NOT NULL,
            DATE TIMESTAMP NOT NULL,
            AGENT_ID TEXT NOT NULL
        )
    `
}

export async function GET() {
    try {
        await client.sql`BEGIN`;
        await seedUsers();
        // await seedUserImages();
        await createNewUsersTable();
        await createDailyDialsTable();
        await createDailyEmailsTable();
        await client.sql`COMMIT`;
        return new Response(JSON.stringify({ message: "Database got updated" }), { status: 200 });
    } catch (err) {
        console.error("Database error:", err);
        await client.sql`ROLLBACK`;
        if (err instanceof Error) {
            return new Response(
                JSON.stringify({ error: "Database operation failed", details: err.message }),
                { status: 500 }
            );
        } else {
            return new Response(
                JSON.stringify({ error: "Database operation failed", details: "Unknown error" }),
                { status: 500 }
            );
        }
    }
}
