'use client'
import Image from "next/image";
import Logo from '../../public/images/na-icon.png'
import { signOut } from "next-auth/react";

export default function Sidebar() {
    return (
        <div className="flex flex-col justify-between bg-sidebar items-start w-full h-full p-4">
            <div className="w-full">
                <Image 
                    className="mx-auto"
                    src={Logo} 
                    alt="North American Staffing Services" 
                    width={200} 
                    height={200} 
                    priority={true} // Ensures the image is loaded quickly
                />
            </div>
            <div className="">

            </div>
            <div className="w-full flex items-center">
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
