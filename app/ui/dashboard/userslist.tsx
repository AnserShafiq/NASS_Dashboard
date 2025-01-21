
import { fetchUsers } from "@/app/lib/fetchings"
import Link from "next/link"
import React from "react"
import DeleteBtn from "./delete-user-btn"



export default async function Userslist(){

    const Users = await fetchUsers()

    return(
        <div className="w-[1000px] p-4 border-2 border-yellow-500">
            <table className="table w-full border-2 border-red-500 p-2 bg-gray-200">
                <thead className="w-full">
                    <tr className="w-full">
                        <th className="border-2 border-black text-start w-[25%] max-w-[25%] text-wrap">
                            Username
                        </th>
                        <th className="border-2 border-black text-start w-[25%] max-w-[25%] text-wrap">
                            User id
                        </th>
                        <th className="border-2 border-black text-start w-[25%] max-w-[25%] text-wrap">
                            E-Mail
                        </th>
                        {/* <th className="border-2 border-black text-start w-[25%] max-w-[25%] text-wrap">
                            Password
                        </th> */}
                        <th className="border-2 border-black text-start w-[25%] max-w-[25%] text-wrap">
                            Action
                        </th>
                    </tr >
                </thead>
                <tbody className="w-full">
                    {
                    Users.map((user) => (
                        <tr className="w-full" key={user.id}>
                            <td className="border-2 align-top border-black text-start w-[25%] max-w-[25%] text-wrap">
                                {user.user_name}
                            </td>
                            <td className="border-2 align-top border-black text-start w-[25%] max-w-[25%] text-wrap">
                                {user.id}
                            </td>
                            <td className="border-2 align-top border-black text-start w-[25%] max-w-[25%] text-wrap">
                                {user.user_email}
                            </td>
                            {/* <td className="border-2 border-black text-start w-[25%] max-w-[25%] truncate overflow-hidden text-wrap">
                                {user.password}
                            </td> */}
                            <td className="border-2 align-top border-black text-start w-[25%] max-w-[25%] text-wrap">
                                <EditUser id={user.id}>Edit</EditUser>
                                <DeleteBtn id={user.id}>Delete It</DeleteBtn>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

function EditUser({id,children}:{id:string, children:React.ReactNode}){
    return(
        <Link href={`/dashboard/${id}/edit`}>
            {children}
        </Link>
    )
}
