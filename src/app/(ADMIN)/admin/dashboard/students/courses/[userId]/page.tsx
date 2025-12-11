// app/student/course/[userId]/page.tsx
import EditCourseModal from "@/components/admin/EditCourseModal"; // client component
import { ReactQueryServerProvider } from "@/context/ReactQueryServer";
import { format } from "date-fns";
import Link from "next/link";

type StudentCourse = {
  id: string;
  title: string;
  image_url?: string;
  teacher_name?: string;
  price?: number;
  discounted_price?: number | null;
  duration?: string;
  joinedDate?: string | null;
  endDate?: string | null;
  days?: string[];
  category?: string;
};

export default async function StudentCoursesPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;

  // server-side fetch (replace with your actual serverApi call)
  // Example: const courses = await getStudentCourses(userId);
  // For demonstration provide fallback / sample if none:
  // const courses: StudentCourse[] =
  //   (await getStudentCourses(userId)) || [
  //     {
  //       id: "c1",
  //       title: "Advanced classical dance",
  //       teacher_name: "Sanjana",
  //       duration: "6 months",
  //       joinedDate: "2025-10-24",
  //       endDate: "2028-12-28",
  //       price: 12000,
  //       discounted_price: 9000,
  //       days: ["Monday", "Wednesday", "Friday"],
  //       category: "Dance",
  //     },
  //   ];

 const courses: StudentCourse[] = [
  {
    id: "c1",
    title: "Advanced Classical Dance",
    teacher_name: "Sanjana",
    duration: "6 Months",
    joinedDate: "2025-10-24",
    endDate: "2026-04-24",
    price: 12000,
    discounted_price: 9000,
    days: ["Monday", "Wednesday", "Friday"],
    category: "Dance",
  },
  {
    id: "c2",
    title: "Beginner Yoga & Wellness",
    teacher_name: "Aditi Sharma",
    duration: "3 Months",
    joinedDate: "2025-06-10",
    endDate: "2025-09-10",
    price: 8000,
    discounted_price: null,
    days: ["Tuesday", "Thursday"],
    category: "Yoga",
  },
  {
    id: "c3",
    title: "Kids Music (Vocal + Instruments)",
    teacher_name: "Rahul Verma",
    duration: "4 Months",
    joinedDate: "2025-01-15",
    endDate: "2025-05-15",
    price: 10000,
    discounted_price: 7000,
    days: ["Saturday", "Sunday"],
    category: "Music",
  },
];

  return (
    <ReactQueryServerProvider>
      <div className="p-6 space-y-6 text-white bg-[#0a0a0a] min-h-screen">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">{courses.length}{"  "}Courses Joined by Student</h1>
          <Link href="/admin/dashboard/courses" className="text-sm text-muted-foreground underline">
            Manage Courses
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <article
              key={c.id}
              className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-4 shadow-sm"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{c.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{c.teacher_name}</p>

                  <div className="flex items-center gap-2 mt-3">
                    <span className="inline-flex items-center gap-1 text-xs bg-white/5 px-2 py-1 rounded-md">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15 8H9L12 2Z"/></svg>
                      {c.category || "Uncategorized"}
                    </span>

                    {c.days?.length ? (
                      <div className="flex gap-1 flex-wrap">
                        {c.days.map((d) => (
                          <span key={d} className="text-xs px-2 py-1 bg-white/5 rounded-md">
                            {d}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div>
                      <div className="text-xs">Duration</div>
                      <div className="font-medium">{c.duration ?? "-"}</div>
                    </div>
                    <div>
                      <div className="text-xs">Joined</div>
                      <div className="font-medium">
                        {c.joinedDate ? format(new Date(c.joinedDate), "dd MMM yyyy") : "-"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs">Ends</div>
                      <div className="font-medium">
                        {c.endDate ? format(new Date(c.endDate), "dd MMM yyyy") : "-"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="text-right">
                    {c.discounted_price && c.discounted_price < (c.price || 0) ? (
                      <>
                        <div className="text-xl font-bold text-primary">₹{c.discounted_price?.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground line-through">₹{c.price?.toLocaleString()}</div>
                      </>
                    ) : (
                      <div className="text-xl font-bold text-primary">₹{c.price?.toLocaleString()}</div>
                    )}
                  </div>

                  {/* Client-side modal component for edit */}
                  <div>
                    <EditCourseModal course={c} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </ReactQueryServerProvider>
  );
}
