// 'use client'
import Userslist from "@/app/ui/dashboard/userslist";
import CreateUserForm from "../../ui/create-user";
import { auth } from "@/auth";
// import { useSession } from "next-auth/react";


export default async function Page(){

    const session = await auth() 
    // const {data:session, status} = useSession()
    console.log('Form dashboard =>' ,session)
    // const user = session?.user

    return(
        <main>
            {/* {status} */}
            DASHBOARD
            <h3>Welcome {session?.user?.name}</h3>
            <Userslist />
            <CreateUserForm />
        </main>
    )
}