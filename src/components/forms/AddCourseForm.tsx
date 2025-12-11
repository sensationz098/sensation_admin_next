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

// const TEACHERS = [
//   { value: "anu", label: "anu" },
//   { value: "aakanksha singh", label: "aakanksha singh" },
//   { value: "abhijit", label: "abhijit" },
//   { value: "abhishek", label: "abhishek" },
//   { value: "aditi vyas", label: "aditi vyas" },

//   { value: "akshita yadav", label: "akshita yadav" },
//   { value: "aman chhari", label: "aman chhari" },
//   { value: "ankur", label: "ankur" },

//   { value: "anshika yadav", label: "anshika yadav" },
//   { value: "anusha", label: "anusha" },
//   { value: "arti gupta", label: "arti gupta" },
//   { value: "archna", label: "archna" },
//   { value: "ashwani sharma", label: "ashwani sharma" },
//   { value: "bhumi thapa", label: "bhumi thapa" },
//   { value: "deepanshi", label: "deepanshi" },
//   { value: "divya", label: "divya" },
//   { value: "dhriti jain", label: "dhriti jain" },
//   { value: "garima daiya", label: "garima daiya" },
//   { value: "geeta", label: "geeta" },
//   { value: "gresi gurung", label: "gresi gurung" },
//   { value: "jagriti", label: "jagriti" },
//   { value: "lokesh", label: "lokesh" },
//   { value: "kishan", label: "kishan" },
//   { value: "khushi", label: "khushi" },
//   { value: "krishna", label: "krishna" },
//   { value: "kritika", label: "kritika" },
//   { value: "madhuri", label: "madhuri" },
//   { value: "madhumita mahesh", label: "madhumita mahesh" },
//   { value: "manpreet kumar", label: "manpreet kumar" },
//   { value: "mansi pal", label: "mansi pal" },
//   { value: "megha rajawat", label: "megha rajawat" },
//   { value: "monika", label: "monika" },
//   { value: "mradula khandelwal", label: "mradula khandelwal" },
//   { value: "nandini", label: "nandini" },
//   { value: "navjot", label: "navjot" },
//   { value: "neha", label: "neha" },
//   { value: "nisha", label: "nisha" },
//   { value: "nikita", label: "nikita" },
//   { value: "nidhi bala", label: "nidhi bala" },

//   { value: "paras", label: "paras" },
//   { value: "parul", label: "parul" },
//   { value: "poonam kumari", label: "poonam kumari" },
//   { value: "prachi khare", label: "prachi khare" },
//   { value: "prakriti", label: "prakriti" },
//   { value: "preeti sharma", label: "preeti sharma" },
//   { value: "priya mathur", label: "priya mathur" },
//   { value: "priyanshi", label: "priyanshi" },
//   { value: "prerna", label: "prerna" },
//   { value: "rahul", label: "rahul" },
//   { value: "rajeev", label: "rajeev" },
//   { value: "rashmi", label: "rashmi" },
//   { value: "ranjini", label: "ranjini" },
//   { value: "reetu", label: "reetu" },
//   { value: "rishab bari", label: "rishab bari" },

//   { value: "ritu bajaj", label: "ritu bajaj" },
//   { value: "ritu karmakar", label: "ritu karmakar" },
//   { value: "ritu kumari", label: "ritu kumari" },
//   { value: "ruchita", label: "ruchita" },
//   { value: "surbhi", label: "surbhi" },
//   { value: "satyam magu", label: "satyam magu" },
//   { value: "shaanu", label: "shaanu" },
//   { value: "sherin", label: "sherin" },
//   { value: "shreya", label: "shreya" },
//   { value: "shikha tomar", label: "shikha tomar" },
//   { value: "shweta", label: "shweta" },
//   { value: "sneha maurya", label: "sneha maurya" },
//   { value: "sonali dhote", label: "sonali dhote" },
//   { value: "suman lata", label: "suman lata" },
//   { value: "suraj", label: "suraj" },
//   { value: "swati", label: "swati" },
//   { value: "vashnavi", label: "vashnavi" },
//   { value: "vasudha", label: "vasudha" },
//   { value: "vibha mittal", label: "vibha mittal" },
//   { value: "yaman", label: "yaman" },
//   { value: "yashobanti", label: "yashobanti" },
// ];


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
        toast.error(res?.error ?  `${res?.error} ` : "Unknow error");
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
      mrp:"",
      discount:"",
      recommended: false,
      status: true,
    },
  });

  async function onSubmit(data: AddCourseFormSchemaType) {
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



      {/* Teacher
              <Controller
                name="teacher"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="teacher">
                      Teacher <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="teacher"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        {TEACHERS.map((teacher) => (
                          <SelectItem
                            key={teacher.value}
                            value={teacher.value}
                          >
                            {teacher.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              /> */}


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

              {/* MRP */}
<Controller
  name="mrp"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor="course-mrp">
        MRP <span className="text-red-500">*</span>
      </FieldLabel>
      <Input
        {...field}
        id="course-mrp"
        type="number"
        min="0"
        aria-invalid={fieldState.invalid}
        placeholder="Enter course MRP"
        autoComplete="off"
      />
      {fieldState.invalid && (
        <FieldError errors={[fieldState.error]} />
      )}
    </Field>
  )}
/>

{/* Discount */}
<Controller
  name="discount"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor="course-discount">
        Discount (%)
      </FieldLabel>
      <Input
        {...field}
        id="course-discount"
        type="number"
        min="0"
        max="100"
        aria-invalid={fieldState.invalid}
        placeholder="Enter discount percent"
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
