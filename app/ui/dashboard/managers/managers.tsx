import Userslist from "../userslist";
import AddNewAgent from "../add-agent";
import AddManager from "../add-manager";

// eslint-disable-next-line
export default async function ManagersDasboard({User}:{User:any}){
    return(
        <div>
            <h3>
            Welcome {User?.name}, {User?.email}
          </h3>
            {/* <Image
                src={User?.profile_pic}
                alt={`${User?.user_name}'s pic`}
                width={300}
                height={250}
            /> */}
            <Userslist />
            <AddNewAgent />
            <AddManager User={User?.manager_id}/>
        </div>
    )
}