"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";

export type CounsellorType = {
  id: string;
  name: string;
  gender: string;
  employee_id: string;
  contact: string;
  incentive: number;
  status: boolean;
  createdAt: string;
};

export const counsellorColumn: ColumnDef<CounsellorType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "employee_id",
    header: "Employee ID",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "incentive",
    header: "Incentive",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (row.original.status ? "Active" : "Inactive"),
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => new Date(row.original.createdAt).toDateString(),
  },
   {
    id: "actions",
    header:"Action",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/admin/dashboard/counsellors/view/${id}`}>View Details</Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem asChild>
              <Link href={`/admin/dashboard/students/update/${id}`}>Update Details</Link>
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
