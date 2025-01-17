import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from 'next-auth/providers/credentials'
import { z } from "zod";
import { User } from "./app/lib/definitions";
import { sql } from "@vercel/postgres";
// import bcrypt from 'bcrypt'

async function getUser(email:string) {
    try{
        console.log('Going to check email in DB', email)
        const user = await sql<User>`SELECT * FROM user_profiles WHERE user_email=${email}`
        return user.rows[0]
    }catch(error){
        console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
    }
}

export const {handlers, auth, signIn, signOut} = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
        credentials:{
            email: { label: "Email", type: "email", placeholder: "Email" },
            password: { label: "Password", type: "password", placeholder: "Password" },
        },
        async authorize(credentials){
            const parsedCredentials = z.object({
                email:z.string().email(),
                password:z.string().min(6)
            }).safeParse(credentials);

            if (parsedCredentials.success){
                const {email,password} = parsedCredentials.data
                const user = await getUser(email)
                if(!user) return null
                if (password === user.password) 
                {
                    console.log('password matched')
                    return user
                }

            }
            console.log('Invalid Credentials')
            return null
        },

    })]
})