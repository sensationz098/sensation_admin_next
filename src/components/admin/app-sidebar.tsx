
"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";


export function AppSidebar() {
  const pathname = usePathname()



  const links =[
  { href: "/admin/dashboard", label: "Dashboard" },
          { href: "/admin/dashboard/courses", label: "Courses" },
          { href: "/admin/dashboard/students", label: "Students" },
          { href: "/admin/dashboard/teachers", label: "Teachers" },
          { href: "/admin/dashboard/counsellors", label: "Counsellors" },
          { href: "/admin/dashboard/activeBatches", label: "Active Batches" },
          { href: "/admin/dashboard/transactions", label: "Transactions" },
          { href: "/admin/dashboard/transactionCoupon", label: "Transaction Coupon" },
      
      

      
      
      
        ]





  return (
    <nav className="h-full p-6 text-sm text-gray-200">
      <div className="mb-8">
        <div className="text-xl font-semibold text-white">{
            "Admin"}</div>
      </div>

   <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`block px-3 py-2 rounded-lg transition-colors ${
                pathname === link.href
                  ? "bg-[#1E90FF] text-white"
                  : "hover:bg-[#171717]"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}