import { sql } from "@vercel/postgres";
import { User } from "./definitions";


export async function fetchUsers (){
    try{
        const users = await sql<User>`SELECT * FROM user_profiles`;
        return users.rows;
    }catch(error){
        console.error('Unable to read users from DB', error)
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
  