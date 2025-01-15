'use client'
import Userslist from "@/app/ui/dashboard/userslist";
import CreateUserForm from "../../ui/create-user";
import { useSession } from "next-auth/react";


export default function Page(){

    const {data:session, status} = useSession()

    const user = session?.user

    return(
        <main>
            {status}
            DASHBOARD
            <h3>Welcome {user?.name} </h3>
            <Userslist />
            <CreateUserForm />
        </main>
    )
}