import Userslist from "@/app/ui/dashboard/userslist";
import Form from "../../ui/create-user";
import ImageUpload from "@/app/ui/dashboard/image-upload";


export default function Page(){
    return(
        <main>

            DASHBOARD
            <Userslist />
            <h3>To Create A New User: </h3>
            <Form />
            <ImageUpload />
        </main>
    )
}