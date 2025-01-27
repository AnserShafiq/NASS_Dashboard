import NextAuth, { CredentialsSignin } from "next-auth";
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
            console.log('Checking in agents table')
            user = await sql<Agent>`SELECT * FROM AGENTS WHERE agent_id=${email}`
        }else if(type === 'manager'){
            console.log('Checking in managers table')
            user = await sql<Managers>`SELECT * FROM MANAGER_USERS WHERE manager_id=${email}`
        }
        return user.rows[0]
    }catch(error){
        console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
    }
}

export class UserDoesNotExistError extends CredentialsSignin {
    code = "AuthError"
    message = "User does not exist - Please check credentials"
}

export class PasswordInccorectError extends CredentialsSignin {
    code = "AuthError"
    message = "Password is incorrect - Please check credentials"
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
                password:z.string(),
            }).safeParse(credentials);

            if (parsedCredentials.success){
                const {employee_code,password} = parsedCredentials.data
                let user,type;
                if(employee_code.includes('NASS_AG_')){
                    type ='agent'
                    user = await getUser(employee_code,type)
                }else if(employee_code.includes('NASS_MN_')){
                    type='manager'
                    user = await getUser(employee_code,type)
                }
                console.log('User ==> ', user)
                if(!user) 
                {
                    return new UserDoesNotExistError()
                }
                else
                {
                    if (password === user.password) 
                    {
                        const toSend = {
                            ...user,
                            user_type: type,
                        }
                        console.log(toSend)
                        return toSend
                    }else{
                        console.log('Incorrect password')
                        return new PasswordInccorectError()
                    
                    }
                }
            }
            console.log('Invalid Credentials')
            return null
        },

    })]
})