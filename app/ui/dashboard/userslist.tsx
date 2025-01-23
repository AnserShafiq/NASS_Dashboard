
import { fetchUsers } from "@/app/lib/fetchings"
import Link from "next/link"
import React from "react"
import DeleteBtn from "./delete-user-btn"



export default async function Agentslist(){

    const Agents = await fetchUsers('agents')

    return(
        <div className="w-[1000px] p-4 border-2 border-yellow-500">
            <h3>List Of All Agents</h3>
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
                        <th className="border-2 border-black text-start w-[25%] max-w-[25%] text-wrap">
                            Action
                        </th>
                    </tr >
                </thead>
                <tbody className="w-full">
                    {
                    Agents.map((user) => (
                        <tr className="w-full" key={user.agent_id}>
                            <td className="border-2 align-top border-black text-start w-[25%] max-w-[25%] text-wrap">
                                {user.name}
                            </td>
                            <td className="border-2 align-top border-black text-start w-[25%] max-w-[25%] text-wrap">
                                {user.agent_id}
                            </td>
                            <td className="border-2 align-top border-black text-start w-[25%] max-w-[25%] text-wrap">
                                {user.email}
                            </td>

                            <td className="border-2 align-top border-black text-start w-[25%] max-w-[25%] text-wrap">
                                <EditUser id={user.agent_id}>Edit</EditUser>
                                <DeleteBtn id={user.agent_id}>Delete It</DeleteBtn>
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
