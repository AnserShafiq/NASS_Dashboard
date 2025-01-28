'use client'
import { deleteUser } from "@/app/lib/actions";
// import { redirect } from "next/navigation";
import React from "react";

export default function DeleteBtn({id,children}:{id:string, children:React.ReactNode}){
    const handleDeleteCall = async() => {
        // const response = await fetch(`/api/user/${id}`, {method: 'DELETE'})
        const response = await deleteUser(id)
        // if(response.ok){
        //     console.log('User got deleted')
        //     redirect('/dashboard')
        // }
        console.log(response.message)
    }
    return(
        <button className="ml-3" onClick={handleDeleteCall}>
            {children}
        </button>
    )
}