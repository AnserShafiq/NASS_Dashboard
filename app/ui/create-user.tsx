'use client'
import { useDebouncedCallback } from "use-debounce";
import { checkUserId, createUser } from "../lib/actions";
import { useState } from "react";


export default function Form(){

    const [idCheck,setIdCheck] = useState<boolean|null>(null)


    const handleUserId = useDebouncedCallback(async(term:string) => {
        const check:number = await checkUserId(term);
        if( check === 0 && term){
            setIdCheck(true)
        }else if(check > 0 && term){
            setIdCheck(false)
        }else{
            setIdCheck(null)
        }
    },300)
    return(
        <form action={createUser}>
            <div className='flex flex-col'>
            <label>Enter user id:</label>
            <input className="text-black" type="text" name="id" id="id" placeholder="enter your username id" onChange={(e) => handleUserId(e.target.value)}/>
            {idCheck === false && <p className="text-red-500">This ID is already taken.</p>}
            {idCheck === true && <p className="text-green-500">This ID is available!</p>}
                <label>Enter username:</label>
                <input className="text-black" type="text" name="name" id="name" placeholder="enter your name" />
                <label>Enter email:</label>
                <input className="text-black" type="email" name="email" id="email" placeholder="enter your email" />
                <label>Enter password:</label>
                <input className="text-black" type="text" name="password" id="password" placeholder="enter your password" />
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}