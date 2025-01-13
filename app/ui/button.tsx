import Link from "next/link";


export default function Button({className,href,children}:{className:string, href: string, children:React.ReactNode}){
    return(
        <>
        <Link className={`${className} px-4 py-2 rounded-xl`} href={href}>
            {children}
        </Link>
        </>
    )
}