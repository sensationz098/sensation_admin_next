"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StudentType } from "@/types/StudentType";
import { Divide } from "lucide-react";

export default function StudentProfile({ student }: { student: StudentType }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: student.name,
    email: student.email,
    phone_no: student.phone_no,
    state: student.state,
  });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setOpen(false);
  };

 
    
  return (
    <div className="bg-[#181818] text-white rounded-xl shadow-lg p-6 max-w-3xl w-full border border-[#222]">
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <Image
        src={student.image_url || "/placeholder.png"}      
         alt={student.name}
          width={120}
          height={120}
          className="rounded-full border border-[#333]"
        />

        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{student.name}</h2>
          <p className="text-sm text-gray-400">{student.email}</p>
          <p className="text-sm text-gray-400">{student.phone_no}</p>
          <p className="text-sm mt-2">{student.state}, India</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Enrolled Courses</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {(student.enrolled_courses ?? []).map((course) => (
  <span key={course} className="bg-[#222] text-sm px-3 py-1 rounded-md">
    {course}
  </span>
))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Joined On</h3>
        <p className="text-gray-400">{student.join_date}</p>
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          onClick={() => setOpen(true)}
          className="bg-[#00BFFF] text-black hover:bg-[#1E90FF]"
        >
          Edit Student
        </Button>

        <Button
          variant="outline"
          onClick={() => router.push(`/admin/dashboard/students/courses/${student.id}`)}
          className="bg-green-600 hover:bg-green-700"
        >
          View Courses
        </Button>
      </div>

      {/* Edit Student Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#181818] text-white border border-[#333]">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <div>
              <Label>Name</Label>
              <Input
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                className="bg-[#222] border-[#333] text-white"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                name="email"
                value={editData.email}
                onChange={handleEditChange}
                className="bg-[#222] border-[#333] text-white"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                name="phone_no"
                value={editData.phone_no}
                onChange={handleEditChange}
                className="bg-[#222] border-[#333] text-white"
              />
            </div>
            <div>
              <Label>State</Label>
              <Input
                name="state"
                value={editData.state}
                onChange={handleEditChange}
                className="bg-[#222] border-[#333] text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-[#333] text-gray-300 hover:bg-[#222]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[#00BFFF] text-black hover:bg-[#1E90FF]"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}