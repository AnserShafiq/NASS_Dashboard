import { signOut } from "@/auth";
import React from "react";


export default function Layout({children}:{children:React.ReactNode}){
    return(
        <div className="min-h-screen min-w-screen flex flex-row">
            <div className="w-1/6 bg-gray-500 flex flex-col items-start justify-center pl-4">
                <h2>Side bar</h2>
                <button onClick={ 
                    async() => {
                        'use server'
                        await signOut();
                    }
                } className="text-black bg-gray-50 rounded-md px-3 py-1">
                    Sign Out
                </button>
            </div>
            <div className="w-5/6 bg-gray-50 text-black flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}