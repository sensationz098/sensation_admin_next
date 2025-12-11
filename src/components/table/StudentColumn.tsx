"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { StudentType } from "@/types/StudentType";
import Image from "next/image";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogTrigger } from "../ui/dialog";
import StudentProfile from "../admin/StudentProfile";

export type Student = {
  id: string;
  status: boolean;
  createdAt: string | Date;
  gender: "MALE" | "FEMALE";
  full_name: string;
};
export const studentColumn: ColumnDef<StudentType>[] = [
    {
      accessorKey: "id",
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const s = row.original;
        return (
          <div className="flex items-center gap-2">
            <Image
              src={s.image_url || "/default-avatar.png"}
              alt="pic"
              width={30}
              height={30}
              className="rounded-full object-cover"
            />
            <span>{s.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ getValue }) => (
        <span className="text-zinc-300">{getValue() as string}</span>
      ),
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "phone_no",
      header: "Phone",
    },
    {
      accessorKey: "join_date",
      header: "Joined",
      cell: ({ getValue }) => {
        try {
          return new Date(getValue() as string).toLocaleDateString("en-IN");
        } catch {
          return getValue() as string;
        }
      },
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
              <Link href={`/admin/dashboard/students/view/${id}`}>View Details</Link>
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
