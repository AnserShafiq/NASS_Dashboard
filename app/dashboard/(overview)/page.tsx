
import Userslist from "@/app/ui/dashboard/userslist";
import { auth } from "@/auth";
import { getUserDetails } from "@/app/lib/actions";
// import Image from "next/image";
import { Suspense } from "react";
import Loading from "@/app/ui/loading";
import AddNewAgent from "@/app/ui/dashboard/add-agent";
import AddManager from "@/app/ui/dashboard/add-manager";

export default async function Page() {
  const session = await auth();
  // console.log('Frontend ==> ', session?.user?.id)
  // Fetch user details
  const User = await getUserDetails(session?.user?.id);
  // console.log('Frontend ==> ', User)
  return (
    <Suspense fallback={<Loading />}>
    <main>
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
      <AddManager User={User?.id}/>
    </main>
    </Suspense>
  );
}
