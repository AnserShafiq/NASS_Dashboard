import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from 'next-auth/providers/credentials'
import { z } from "zod";
import { Agent, Managers} from "./app/lib/definitions";
import { sql } from "@vercel/postgres";
// import bcrypt from 'bcrypt'

async function getUser(email:string, type: string) {
    try{
        console.log('Going to check employee code in DB', email)
        // eslint-disable-next-line
        let user:any;
        if(type === 'agent'){
            user = await sql<Agent>`SELECT * FROM AGENTS WHERE agent_id=${email}`
        }else if(type === 'manager'){
            user = await sql<Managers>`SELECT * FROM MANAGER_USERS WHERE manager_id=${email}`
        }
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
            id: { label: "Employee Code", type: "text", placeholder: "Employee Code" },
            password: { label: "Password", type: "password", placeholder: "Password" },
        },
        async authorize(credentials){
            const parsedCredentials = z.object({
                employee_code:z.string(),
                password:z.string().min(6)
            }).safeParse(credentials);

            if (parsedCredentials.success){
                const {employee_code,password} = parsedCredentials.data
                let user,type;
                if(employee_code.includes('NASS_AG_')){
                    // console.log('Agent Getting Logged In')
                    type ='agent'
                    user = await getUser(employee_code,type)
                }else if(employee_code.includes('NASS_MN_')){
                    // console.log('Agent Getting Logged In')
                    type='manager'
                    user = await getUser(employee_code,type)

                }

                if(!user) return null
                if (password === user.password) 
                {
                    // console.log('password matched',user)
                    const toSend = {
                        ...user,
                        user_type: type,
                    }
                    return toSend
                }

            }
            console.log('Invalid Credentials')
            return null
        },

    })]
})