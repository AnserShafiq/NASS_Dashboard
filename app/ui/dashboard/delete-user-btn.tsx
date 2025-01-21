'use client'
import { redirect } from "next/navigation";
import React from "react";

export default function DeleteBtn({id,children}:{id:string, children:React.ReactNode}){
    const handleDeleteCall = async() => {
        const response = await fetch(`/api/user/${id}`, {method: 'DELETE'})
        if(response.ok){
            console.log('User got deleted')
            redirect('/dashboard')
        }
    }
    return(
        <button className="ml-3" onClick={handleDeleteCall}>
            {children}
        </button>
    )
}