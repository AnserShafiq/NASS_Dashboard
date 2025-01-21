
import Userslist from "@/app/ui/dashboard/userslist";
import { auth } from "@/auth";
import { getUserDetails } from "@/app/lib/actions";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "@/app/ui/loading";
import AddNewAgent from "@/app/ui/dashboard/add-agent";

export default async function Page() {
  const session = await auth();

  // Fetch user details
  const User = await getUserDetails(session?.user?.id);

  return (
    <Suspense fallback={<Loading />}>
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
      <AddNewAgent />
    </main>
    </Suspense>
  );
}
