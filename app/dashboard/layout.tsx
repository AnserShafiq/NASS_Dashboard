
import React, { Suspense } from "react";
import Sidebar from "../ui/sidebar";
import { auth } from "@/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  let usertype: string = '';
  const session = await auth();
  if(session?.user?.id?.includes('NASS_AG_')){
    usertype = 'agent'
  }else if (session?.user?.id?.includes('NASS_MN_')){
    usertype = 'manager'
  }

  return (
    <Suspense>
    <div className="h-screen min-w-screen relative flex flex-row">
      <div className="w-sidebar bg-gray-500 flex flex-col items-start justify-center ">
        <Sidebar type={usertype}/>
      </div>
      <div className="relative w-full max-w-dashboard h-full bg-gray-50 text-black flex items-start justify-center overflow-y-auto top-0">
      <h3 className="absolute right-2 top-3">User Profile</h3>
        {children}
      </div>
    </div>
    </Suspense>
  );
}
