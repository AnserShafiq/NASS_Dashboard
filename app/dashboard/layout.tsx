import React from "react";


export default function Layout({children}:{children:React.ReactNode}){
    return(
        <div className="min-h-screen min-w-screen flex flex-row">
            <div className="w-1/6 bg-gray-500 flex flex-col items-start justify-center pl-4">
                <h2>Side bar</h2>
            </div>
            <div className="w-5/6 bg-gray-50 text-black flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}