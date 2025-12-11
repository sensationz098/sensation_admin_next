"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; // if you use sonner; optional

type CourseEditValues = {
  title: string;
  duration: string;
  joinedDate: string | null;
  endDate: string | null;
};

type Props = {
  course: {
    id: string;
    title: string;
    duration?: string;
    joinedDate?: string | null;
    endDate?: string | null;
  };
};

export default function EditCourseModal({ course }: Props) {
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();

  const form = useForm<CourseEditValues>({
    defaultValues: {
      title: course.title || "",
      duration: course.duration || "",
      joinedDate: course.joinedDate ? course.joinedDate.substring(0, 10) : "",
      endDate: course.endDate ? course.endDate.substring(0, 10) : "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: CourseEditValues) => {
      // call your server/api - update route
      // Replace /api/courses with your AWS endpoint if needed
      const res = await fetch(`/api/courses/${course.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Update failed");
      }
      return res.json();
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["student-courses"] });
      toast?.success?.("Course updated");
      setOpen(false);
    },
    onError: (err: any) => {
      toast?.error?.(err?.message || "Failed to update");
    },
  });

  async function onSubmit(values: CourseEditValues) {
    mutation.mutate(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label className="mb-1">Title</Label>
            <Input {...form.register("title", { required: true })} />
          </div>

          <div>
            <Label className="mb-1">Duration</Label>
            <Input {...form.register("duration")} placeholder="e.g. 6 months" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="mb-1">Joined Date</Label>
              <Input type="date" {...form.register("joinedDate")} />
            </div>
            <div>
              <Label className="mb-1">End Date</Label>
              <Input type="date" {...form.register("endDate")} />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
