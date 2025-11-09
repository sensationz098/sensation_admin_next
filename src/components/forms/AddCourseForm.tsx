"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddCourseFormSchema,
  AddCourseFormSchemaType,
} from "@/schema/zod-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse } from "@/server/clientApi";
import { toast } from "sonner";

const DAYS_OF_WEEK = [
  { id: "Monday", label: "Monday" },
  { id: "Tuesday", label: "Tuesday" },
  { id: "Wednesday", label: "Wednesday" },
  { id: "Thursday", label: "Thursday" },
  { id: "Friday", label: "Friday" },
  { id: "Saturday", label: "Saturday" },
  { id: "Sunday", label: "Sunday" },
];

const CATEGORIES = [
  { value: "Dance", label: "Dance" },
  { value: "Yoga", label: "Yoga" },
  { value: "Fitness", label: "Fitness" },
  { value: "Music", label: "Music" },
  { value: "English", label: "English" },
  { value: "Crash", label: "Crash" },
];

const AddCourseForm = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["add-course"],
    mutationFn: (courseData: AddCourseFormSchemaType) =>
      createCourse(courseData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });

      if (res?.status) {
        toast.success(res.message);
      } else {
        toast.error(res.error || "Something went wrong");
      }
    },
  });

  const form = useForm<AddCourseFormSchemaType>({
    resolver: zodResolver(AddCourseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      days: [],
      image_url: "",
      recommended: false,
      status: true,
    },
  });

  async function onSubmit(data: AddCourseFormSchemaType) {
    console.log(data);
    await mutateAsync(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Course
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new course
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 pr-2">
          <form id="add-course-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Title */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="course-title">
                      Course Title <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="course-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter course title"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Description */}
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="course-description">
                      Description <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="course-description"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter course description"
                      rows={4}
                      className="resize-none"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Category */}
              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="course-category">
                      Category <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="course-category"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Days */}
              <Controller
                name="days"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      Available Days <span className="text-red-500">*</span>
                    </FieldLabel>
                    <div className="space-y-2 mt-2">
                      {DAYS_OF_WEEK.map((day) => (
                        <div
                          key={day.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={day.id}
                            checked={field.value?.includes(day.id)}
                            onCheckedChange={(checked) => {
                              const updatedDays = checked
                                ? [...(field.value || []), day.id]
                                : field.value?.filter((d) => d !== day.id) ||
                                  [];
                              field.onChange(updatedDays);
                            }}
                          />
                          <label
                            htmlFor={day.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {day.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Image URL */}
              <Controller
                name="image_url"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="course-image-url">
                      Course Image URL <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="course-image-url"
                      type="url"
                      aria-invalid={fieldState.invalid}
                      placeholder="https://example.com/image.jpg"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Recommended */}
              <Controller
                name="recommended"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FieldLabel>Recommended Course</FieldLabel>
                        <p className="text-xs text-muted-foreground">
                          Show this course in recommended section
                        </p>
                      </div>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </Field>
                )}
              />

              {/* Status */}
              <Controller
                name="status"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FieldLabel>Active Status</FieldLabel>
                        <p className="text-xs text-muted-foreground">
                          Make this course visible to students
                        </p>
                      </div>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </div>

        {/* Footer - Fixed at bottom */}
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline" onClick={() => form.reset()}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            form="add-course-form"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating..." : "Create Course"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseForm;
