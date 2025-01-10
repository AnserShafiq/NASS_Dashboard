import { fetchUserById } from "@/app/lib/fetchings";
import EditUserForm from "@/app/ui/dashboard/edit-user";


export default async function Page(
    props: {params: Promise<{id:string}>}
)
{
    const params = await props.params
    const id = params.id;
    const user = await fetchUserById(id)
    if (!user) {
        return <div>User not found</div>;
    }
    return(
        <>
            <EditUserForm target={user} />
        </>
    )
}