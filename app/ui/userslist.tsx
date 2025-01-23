import { fetchAgents } from "../lib/fetchings"
import Form from "./create-user";

export default async function Userslist(){
    const users = await fetchAgents()

    // console.log(users);
    return(
        <div>
            <h2>Users List</h2>
            {
                users.map((user) => (
                    <div key={user.agent_id} className="flex flex-row justify-between">
                        <h2>{user.name}</h2>
                        <h2>{user.agent_id}</h2>
                        <h2>{user.email}</h2>
                        <h2>{user.password}</h2>
                    </div>
                ))
            }
            <h3>To create new user:</h3>
            <Form />

        </div>
    )
}