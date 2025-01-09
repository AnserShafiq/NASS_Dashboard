"use server"

import { signIn } from "@/auth";
import { sql } from "@vercel/postgres";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"
import { z } from "zod";


const FormSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    password:z.string()
})

const CreateUser = FormSchema.omit({})

export async function checkUserId(id:string) {
    const userCheck = await sql `
        SELECT * FROM tabletwo WHERE id = ${id}
    `
    return userCheck.rows.length
}


export async function createUser (formData: FormData):Promise<void>{
    const { id,name, email, password} = CreateUser.parse({
        id: formData.get('id'),
        name: formData.get('name'),
        email:formData.get('email'),
        password:formData.get('password'),
    })
    try{
        await sql` 
        INSERT INTO tabletwo (id,name,email,password)
        VALUES (${id}, ${name}, ${email},${password})
        `
        console.log('Created a user')
    }catch(error){
        console.error('User not got created', error);
        // alert({message:'User creation failed'})
    }
    revalidatePath('/')
    redirect('/')
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