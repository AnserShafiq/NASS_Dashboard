
import React, { Suspense } from "react";
import Sidebar from "../ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
    <div className="h-screen min-w-screen relative flex flex-row">
      <div className="w-1/6 bg-gray-500 flex flex-col items-start justify-center ">
        <Sidebar />
      </div>
      <div className="relative w-5/6 h-full border-2 border-black bg-gray-50 text-black flex items-start justify-center overflow-y-auto top-0">
      <h3 className="absolute right-2 top-3">User Profile</h3>
        {children}
      </div>
    </div>
    </Suspense>
  );
}
