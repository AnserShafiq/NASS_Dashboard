import CreateUserForm from "../ui/create-user";
import Form from "../ui/login/login-form";

export default function Page(){
    return(
        <main className="flex flex-row min-h-screen min-w-screen items-center justify-center">
            <div className="w-[50%] px-[5rem]">
                <Form/>
            </div>
            <div className="w-[50%] px-[5rem]">
                <CreateUserForm />
            </div>
        </main>
    )
}