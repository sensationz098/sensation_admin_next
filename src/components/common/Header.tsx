"use client"

import { usePathname } from "next/navigation";
import {signOut} from "next-auth/react"
  


export default function Header() {


    const pathname = usePathname();

     const isDashboard =
    pathname.startsWith("/admin/dashboard") ||
    pathname.startsWith("/staff/dashboard");

  return (
    <header className="w-full bg-black text-white py-4 shadow-md border-b-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

        <h1 className="text-xl font-semibold tracking-wide">
          Sensation Admin Panel
        </h1>

        {
            !isDashboard ? (<a
          href="/login"
          className="bg-white text-black font-medium py-2 px-4 rounded-md hover:bg-gray-200 transition"
        >
          Login
        </a>): (<button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-white text-black font-medium py-2 px-4 rounded-md hover:bg-gray-200 transition"
          >
            Logout
          </button>)
        }
        
        
      </div>
    </header>
  );
}
