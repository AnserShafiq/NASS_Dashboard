'use client'
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { useDebouncedCallback } from "use-debounce";
import { checkUserEmail, createUser } from "../lib/actions";
import { useState } from "react";


export default function CreateUserForm(){

    const [idCheck,setIdCheck] = useState<boolean|null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleUserEmail = useDebouncedCallback(async(term:string) => {
        const check:number = await checkUserEmail(term);
        if( check === 0 && term){
            setIdCheck(true)
        }else if(check > 0 && term){
            setIdCheck(false)
        }else{
            setIdCheck(null)
        }
    },300)

    const handleSubmission = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const result = await createUser(formData)
        if(result.success){
            setSuccessMessage('User got created.')
        }else{
            setSuccessMessage('Failed to create user, try again later.')
        }
    }

    return(
        <form className="space-y-3 text-black" onSubmit={handleSubmission}>
            <div className='flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8'>
            <h1 className={`text-black mb-3 text-2xl`}>
                To Create New Account
            </h1>
                <div className='w-full flex flex-col'>
                    <label className="mb-3 mt-5 block text-xs font-medium text-gray-900">Add your profile pic:</label>
                    <input type='file' name='profilePic' id="profilePic" accept="image/png, image/jpeg, image/jpg"/>
                    
                    {/* <label>Enter user id:</label>
                    <input className="peer block w-full rounded-md border border-gray-200 py-[9px] px-4 text-sm outline-2 placeholder:text-gray-500" type="text" name="id" id="id" placeholder="enter your username id" onChange={(e) => handleUserId(e.target.value)}/>
                    {idCheck === true && <p className="text-green-500">This ID is available!</p>}
                    */}
                    <label className="mb-3 mt-5 block text-xs font-medium text-gray-900">Enter username:</label>
                    <input className="peer block w-full rounded-md border border-gray-200 py-[9px] px-4 text-sm outline-2 placeholder:text-gray-500" type="text" name="name" id="name" placeholder="Enter your full name" />
                    
                    <label className="mb-3 mt-5 block text-xs font-medium text-gray-900 ">Enter email:</label>
                    <input className="peer block w-full rounded-md border border-gray-200 py-[9px] px-4 text-sm outline-2 placeholder:text-gray-500" type="email" name="email" id="email" placeholder="Enter your email" onChange={(e) => handleUserEmail(e.target.value)}/>
                    {idCheck === false && <p className="text-red-500">Email already in use.</p>}

                    <label className="mb-3 mt-5 block text-xs font-medium text-gray-900">Enter password:</label>
                    <input className="peer block w-full rounded-md border border-gray-200 py-[9px] px-4 text-sm outline-2 placeholder:text-gray-500" type="text" name="password" id="password" placeholder="Enter your password" />
                    
                    <button type="submit" className="mt-4 text-gray-900 w-fit py-1 px-10 border-2 border-black rounded-md mx-auto relative">
                    Sign Up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-900 absolute h-full top-[2%] right-2" />
                    </button>
                    {successMessage && <h3 className='text-black'>{successMessage}</h3>}
                </div>
            </div>
        </form>
    )
}