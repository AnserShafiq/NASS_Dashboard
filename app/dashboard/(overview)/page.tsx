// 'use client' <-- Uncomment this if the component is intended to run on the client
import Userslist from "@/app/ui/dashboard/userslist";
import CreateUserForm from "../../ui/create-user";
import { auth } from "@/auth";
import { getUserDetails } from "@/app/lib/actions";
import Image from "next/image";

export default async function Page() {
  const session = await auth();

  // Fetch user details
  const User = await getUserDetails(session?.user?.id);

  return (
    <main>
      <h3>
        Welcome {User?.user_name}, {User?.user_email}
      </h3>
      <Image
        src={User?.profile_pic}
        alt={`${User?.user_name}'s pic`}
        width={300}
        height={250}
      />
      <Userslist />
      <CreateUserForm />
    </main>
  );
}
