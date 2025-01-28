import Image from "next/image";
import Button from "../button";
// import Logo from '/images/home.png'
export default function Left(){
    return(
        <div className="flex flex-col justify-center items-start pl-36 pr-20 w-full h-full">
            
            <Image src={'/images/na-icon.png'} width={150} height={150} alt="North American Staffing Services"/>
            <h2 className="font-bold tracking-wide leading-none text-3xl uppercase mt-2"><span className="text-red-600">North American</span><br /><span className="text-blue-900">Staffing Services</span></h2>
            {/* eslint-disable */}
            <h3 className="mt-3 text-xl text-black">Welcome to North American Staffing Services,<br/> Let's begin to hunt together.</h3>
            {/* eslint-enable */}
            <Button className="border-2 bg-red-600 text-white uppercase font-bold tracking-wider mt-4 hover:bg-red-50 hover:border-red-600 hover:text-red-600 transition-all ease-in-out duration-500 hover:scale-105" href='/login'>Login</Button>
        </div>
    )
}