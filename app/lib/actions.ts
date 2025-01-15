"use server"

import { signIn } from "@/auth";
import { sql } from "@vercel/postgres";
import { AuthError } from "next-auth";
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

export async function checkUserId(id:string) {
    const userCheck = await sql `
        SELECT * FROM tabletwo WHERE id = ${id}
    `
    return userCheck.rows.length
}


export async function createUser (formData: FormData):Promise<void>{
    const { profilePic,name, email, password} = CreateUser.parse({
        profilePic: formData.get('profilePic'),
        // id: formData.get('id'),
        name: formData.get('name'),
        email:formData.get('email'),
        password:formData.get('password'),
    })

    const buffer = Buffer.from(await profilePic.arrayBuffer())

    try{
        console.log(profilePic)
        // await sql` 
        // INSERT INTO tabletwo (id,user_name,user_email,password,profile_pic,pic_type,created_at)
        // VALUES (${id}, ${name}, ${email},${password},${buffer},)
        // `
        const query = {
            text: 'INSERT INTO user_profiles (user_name,user_email,password,profile_pic,pic_type,created_at) VALUES($1,$2,$3,$4,$5,NOW())',
            values: [ name, email, password, buffer,'.png' ]
        }

        await sql.query(query)
        console.log('Created a user')
        
    }catch(error){
        console.error('User not got created', error);
        // alert({message:'User creation failed'})
    }
    revalidatePath('/')
    redirect('/')
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
    formData: FormData,
    ){
    try{
        await signIn('credentials', formData)
    }catch(error){
        if (error instanceof AuthError) {
            switch (error.type) {
              case 'CredentialsSignin':
                return 'Invalid credentials.';
              default:
                return 'Something went wrong.';
            }
        }
          throw error;
    }
}