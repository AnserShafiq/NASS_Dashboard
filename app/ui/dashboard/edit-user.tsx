'use client'
import { editUser } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";



export default function EditUserForm(
    {target}:{target:User}
){

    const updateUser = async(formData: FormData)=>{
        console.log(formData)
        await editUser(target.user_id, formData)
    }

    return(
        <form action={updateUser}>
            <div className='flex flex-col'>
                <label>Username:</label>
                <input className="text-black" type="text" name="name" id="name" defaultValue={target.user_name} />
                <label>Enter email:</label>
                <input className="text-black" type="email" name="email" id="email" defaultValue={target.user_email} />
                <label>Enter password:</label>
                <input className="text-black" type="text" name="password" id="password" defaultValue={target.password} />
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}