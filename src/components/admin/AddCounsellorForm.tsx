"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddCounsellorFormSchema, AddCounsellorFormSchemaType } from "@/schema/zod-schema";
import { toast } from "sonner";

export default function AddCounsellorForm() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["add-counsellor"],
    mutationFn: async (data: AddCounsellorFormSchemaType) => {
      const res = await fetch("/api/counsellors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to add counsellor");
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["counsellors"] });
      toast.success("Counsellor added successfully!");
    },
  });

  const form = useForm<AddCounsellorFormSchemaType>({
    resolver: zodResolver(AddCounsellorFormSchema),
    defaultValues: {
      name: "",
      gender: "MALE",
      employee_id: "",
      contact: "",
      incentive:0,
      status: true,
    },
  });

  async function onSubmit(data: AddCounsellorFormSchemaType) {
    await mutateAsync(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Counsellor</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Counsellor</DialogTitle>
        </DialogHeader>

        <form id="add-counsellor-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>

            {/* Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Name</FieldLabel>
                  <Input {...field} placeholder="Enter counsellor name" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Gender */}
            <Controller
              name="gender"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Gender</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Employee ID */}
            <Controller
              name="employee_id"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Employee ID</FieldLabel>
                  <Input {...field} placeholder="EMP1234" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Contact */}
            <Controller
              name="contact"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Contact</FieldLabel>
                  <Input {...field} placeholder="+91 9876543210" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Incentive */}
            <Controller
              name="incentive"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Incentive Amount</FieldLabel>
                  <Input {...field} type="number" placeholder="Amount in ₹" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            type="submit"
            form="add-counsellor-form"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Add Counsellor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
