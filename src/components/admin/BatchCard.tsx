"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BatchCard({ batch }) {
  return (
    <Dialog>
      <Card
        className="p-5 bg-[#111] border border-[#222] rounded-xl 
        hover:border-[#444] transition"
      >
        {/* Title */}
        <h2 className="text-xl font-semibold">{batch.name}</h2>

        <p className="text-sm mt-1 text-gray-400">
          Teacher: <span className="text-white">{batch.teacher}</span>
        </p>

        <div className="flex items-center gap-2 mt-3 text-gray-300">
          <Clock className="w-4 h-4" /> {batch.duration}
        </div>

        <div className="flex items-center gap-2 mt-2 text-gray-300">
          <Users className="w-4 h-4" /> {batch.students.length} Students
        </div>

        {/* ---- BUTTON SECTION ---- */}
        <div className="mt-4">
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              View Students
            </Button>
          </DialogTrigger>
        </div>
      </Card>

      {/* ---- MODAL ---- */}
      <DialogContent className="bg-[#111] text-white border border-[#333] max-w-lg">
        <DialogHeader>
          <DialogTitle>{batch.name} – Students</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {batch.students.map((s) => (
            <div
              key={s.id}
              className="p-3 bg-[#1a1a1a] rounded-lg border border-[#222]"
            >
              {s.name}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
