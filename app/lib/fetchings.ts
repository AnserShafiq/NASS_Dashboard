import { sql } from "@vercel/postgres";
import { Agent, Managers, User } from "./definitions";


export async function fetchManagers (type:string){
    console.log(type)
    try{
        const managers = await sql<Managers>`SELECT * FROM MANAGER_USERS`;
        return managers.rows;

    }catch(error){
        console.error('Unable to read users from managers table', error)
        throw new Error('Failed to fetch')
    }
}
export async function fetchAgents (){
    try{
        const agents = await sql<Agent>`SELECT * FROM AGENTS`;
        return agents.rows;
    }catch(error){
        console.error('Unable to read users from agents table', error)
        throw new Error('Failed to fetch')
    }
}
export async function fetchUserById(id:string){
    try{
        const user = await sql<User>`SELECT * FROM user_profiles WHERE id=${id}`
        return user.rows[0]
    }catch{
        console.error('User not found')
    }
}

// export async function fetchManagers() {
//     try {
//       const managers = await sql<Managers>`SELECT * FROM manager_users`;
//       return managers.rows; // Assuming 'sql' already processes the rows
//     } catch (err) {
//       console.error('Error fetching managers:', err);
//       return []; // Return an empty array in case of failure
//     }
//   }
  