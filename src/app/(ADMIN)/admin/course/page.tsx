import { CourseCard } from "@/components/admin/CourseCard";
import AddCourseForm from "@/components/forms/AddCourseForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCourses } from "@/server/serverApi";
import { GetAllCourseResponseType } from "@/types/ApiResponseType";
import { QueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";

const CoursePage = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
  });

  const courses = queryClient.getQueryData<GetAllCourseResponseType | null>([
    "courses",
  ]);

  if (!courses)
    return (
      <div>
        <h1>{"Something went wrong"}</h1>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Explore Courses</h1>
        <p className="text-muted-foreground">
          Discover your next learning adventure with our expert-led courses
        </p>
      </div>
      <AddCourseForm />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="web">Web Development</SelectItem>
            <SelectItem value="mobile">Mobile Development</SelectItem>
            <SelectItem value="data">Data Science</SelectItem>
            <SelectItem value="design">UI/UX Design</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select defaultValue="popular">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Course Count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {courses?.data.count}
          </span>{" "}
          courses
        </p>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.data.courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-12">
        <Button size="lg" variant="outline">
          Load More Courses
        </Button>
      </div>
    </div>
  );
};

export default CoursePage;

// components/courses/CourseCard.tsx
