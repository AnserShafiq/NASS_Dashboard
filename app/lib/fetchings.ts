import { sql } from "@vercel/postgres";
import { User } from "./definitions";


export async function fetchUsers (){
    try{
        const users = await sql<User>`SELECT * FROM tabletwo`;
        return users.rows;
    }catch(error){
        console.error('Unable to read users from DB', error)
        throw new Error('Failed to fetch')
    }
}