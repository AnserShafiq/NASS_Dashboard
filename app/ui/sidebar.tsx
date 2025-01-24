'use client'
import Image from "next/image";
import Logo from '../../public/images/na-icon.png'
import { signOut } from "next-auth/react";
import { AgentMenu, ManagerMenu } from "../lib/definitions";
import Link from "next/link";

export default function Sidebar({type}:{type:string}) {

    return (
        <div className="relative flex flex-col justify-top bg-sidebar2 items-start w-full h-full p-4">
            <div className="w-full max-h-[25%] h-[25%] ">
                <Image className="mx-auto" src={Logo} alt="North American Staffing Services" width={120} height={120} priority={true} />
            </div>
            <div className="w-full max-h-[65%] h-[65%] pt-3 px-4">
                {
                    type === 'agent' && AgentMenu.map((item) =>(
                        <div key={item.name} className="my-3">
                            <Link className="text-[1.1rem] text-white uppercase" href={item.link}>{item.name}</Link>
                        </div>
                    ))
                }{
                    type === 'manager' && ManagerMenu.map((item) =>(
                        <div key={item.name} className="my-3">
                            <Link className="text-[1.1rem] text-white uppercase" href={item.link}>{item.name}</Link>
                        </div>
                    ))
                }
            </div>
            <div className="w-full max-h-[10%] h-[10%] flex justify-center items-center">
                <button
                className="mx-auto px-5 py-2 bg-red-800 hover:text-red-800 hover:bg-red-200 text-md font-[600] tracking-wider rounded-2xl border-2 border-red-800"
                onClick={() => signOut({
                    callbackUrl:'/login',
                })}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}
