"use server"

import { signIn } from "@/auth";
import { sql } from "@vercel/postgres";
// import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"
import { z } from "zod";


const FormSchema = z.object({
    profilePic: z
        .instanceof(File) // Checks if `profilePic` is a File object
        .refine(file => file.size > 0, "Profile picture is required and must not be empty."),
    id: z.string(),
    name: z.string(),
    email: z.string(),
    password: z.string()
})

const CreateUser = FormSchema.omit({id:true})
const EditUser = FormSchema.omit({id:true})

export async function checkUserEmail(toCheck:string) {
    const userCheck = await sql `
        SELECT * FROM USER_PROFILES WHERE user_email=${toCheck}
    `
    return userCheck.rows.length
}


export async function createUser (formData: FormData):Promise<{success:boolean}>{
    const { profilePic,name, email, password} = CreateUser.parse({
        profilePic: formData.get('profilePic'),
        name: formData.get('name'),
        email:formData.get('email'),
        password:formData.get('password'),
    })

    const buffer = Buffer.from(await profilePic.arrayBuffer())

    try{
        console.log(profilePic)
        const query = {
            text: 'INSERT INTO user_profiles (user_name,user_email,password,profile_pic,pic_type,created_at) VALUES($1,$2,$3,$4,$5,NOW())',
            values: [ name, email, password, buffer,'.png' ]
        }

        await sql.query(query)
        console.log('Created a user')
        // await signIn('credentials', formData)
        return {success: true};
        
    }catch(error){
        console.error('User not got created', error);
        // alert({message:'User creation failed'})
        return {success: false}
    }
}

export async function getUserDetails(id:string | undefined){
    try {
        // eslint-disable-next-line
        let result:any;
        if(id?.includes('NASS_AG_'))
        {
            result = await sql`SELECT * FROM AGENTS WHERE agent_id=${id}`
        }else if(id?.includes('NASS_MN_')){
            result = await sql`SELECT * FROM MANAGER_USERS WHERE manager_id=${id}`
        }
        const user = result.rows[0]
        return user
    }catch{
        console.error('Unable to get user.')
        return null
    }
}

export async function deleteUser(id:string){
    try{
        await sql`DELETE FROM AGENTS WHERE agent_id=${id}` 
        return {message: 'User deleted successfully'}
    }catch{
        return{
            message: 'User not available',
        }
    }
}

export async function editUser (id:string, formData: FormData){
    const {name, email, password}=EditUser.parse({
        name: formData.get('name'),
        email:formData.get('email'),
        password:formData.get('password')
    })

    try {
        await sql`UPDATE user_profiles SET user_name=${name}, user_email=${email}, password=${password} WHERE id=${id}`
    } catch {
        return{
            message: 'User not available',
        }
    }
    revalidatePath('/')
    redirect('/dashboard')
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        // eslint-disable-next-line
        const data: Record<string, any> = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });


        const user = await signIn('credentials', {
            redirect: false,
            ...data,
        });

        if (user?.error) {
            console.error('Authentication error:', user.error);
            return { error: user.error };
        }

        console.log('Action==>', user);
        return { success: true, user }; 
    } 
    // eslint-disable-next-line
    catch (error: any) {
        console.error('Error from Authenticate Action => ', error);
        const errorMessage = error.message || "An unknown error occurred - Please contact the administrator";
        return { error: errorMessage };
    }
}
