import { auth } from "@/auth";
import { getUserDetails } from "@/app/lib/actions";
import { Suspense } from "react";
import Loading from "@/app/ui/loading";
import AgentsDashboard from "@/app/ui/dashboard/agents/agents";
import ManagersDasboard from "@/app/ui/dashboard/managers/managers";

export default async function Page() {
  const session = await auth();
  // console.log('Frontend ==> ', session?.user?.id)
  // Fetch user details
  const User = await getUserDetails(session?.user?.id);
  let display:string='';
  if (session?.user?.id?.includes('NASS_AG_')){
    display = 'Agent';
  }else if(session?.user?.id?.includes('NASS_MN_')){
    display= 'Manager';
  }
  // console.log('Frontend ==> ', display)


  return (
    <Suspense fallback={<Loading />}>
    <main className=" w-dashboard min-h-screen">
    {
      display === 'Agent' ? (
        <AgentsDashboard User={User} Id={session?.user?.id}/>
      ):(
        <ManagersDasboard User={User}/>
      )
    }
    </main>
    </Suspense>
  );
}
