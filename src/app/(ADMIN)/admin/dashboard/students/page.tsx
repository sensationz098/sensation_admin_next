"use client";

import { DataTable } from "@/components/table/DataTable";
import { StudentType } from "@/types/StudentType";
import { studentColumn } from "@/components/table/StudentColumn";
import { ReactQueryServerProvider } from "@/context/ReactQueryServer";

export default function StudentPage() {
const mockStudents: StudentType[] = [
  {
    id: "1",
    name: "Student 1",
    email: "student1@example.com",
    phone_no: "9876500001",
    gender: "MALE",
    state: "Maharashtra",
    enrolled_courses: ["Kathak Beginners", "Yoga Flow"],
    image_url: "/default-avatar.png",
    join_date: "2024-02-01",
  },
  {
    id: "2",
    name: "Student 2",
    email: "student2@example.com",
    phone_no: "9876500002",
    gender: "FEMALE",
    state: "Maharashtra",
    enrolled_courses: ["Dance Fusion"],
    image_url: "/default-avatar.png",
    join_date: "2024-02-01",
  },
  {
    id: "3",
    name: "Student 3",
    email: "student3@example.com",
    phone_no: "9876500003",
    gender: "MALE",
    state: "Maharashtra",
    enrolled_courses: ["Kathak Beginners", "Yoga Flow"],
    image_url: "/default-avatar.png",
    join_date: "2024-02-01",
  },
  {
    id: "4",
    name: "Student 4",
    email: "student4@example.com",
    phone_no: "9876500004",
    gender: "FEMALE",
    state: "Maharashtra",
    enrolled_courses: ["Dance Fusion"],
    image_url: "/default-avatar.png",
    join_date: "2024-02-01",
  },
  {
    id: "5",
    name: "Student 5",
    email: "student5@example.com",
    phone_no: "9876500005",
    gender: "MALE",
    state: "Maharashtra",
    enrolled_courses: ["Kathak Beginners"],
    image_url: "/default-avatar.png",
    join_date: "2024-02-01",
  }
];



  return (
        <ReactQueryServerProvider>
    
    <main className="p-6 min-h-screen bg-[#0a0a0a] text-white">
              <h1 className="text-4xl font-bold mb-2">Students</h1>

      <h2>Total Student: is 786</h2>
      <DataTable columns={studentColumn} data={mockStudents} />
    </main>
        </ReactQueryServerProvider>
    
  );
}
