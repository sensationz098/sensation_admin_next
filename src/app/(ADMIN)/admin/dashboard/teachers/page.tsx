import { DataTable } from "@/components/table/DataTable";
import { teacherColumn } from "@/components/table/TeacherColumn";
import { ReactQueryServerProvider } from "@/context/ReactQueryServer";
import { getAllTeachers } from "@/server/serverApi";
import { GetAllTeacherResponseType } from "@/types/ApiResponseType";
import { QueryClient } from "@tanstack/react-query";

const TeacherPage = async () => {
  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 60 * 1000,
  //     },
  //   },
  // });

  // await queryClient.prefetchQuery({
  //   queryKey: ["teachers"],
  //   queryFn: getAllTeachers,
  // });

  // const teachers = queryClient.getQueryData<GetAllTeacherResponseType | null>([
  //   "teachers",
  // ]);

  // if (!teachers)
  //   return (
  //     <div>
  //       <h1>{"Something went wrong"}</h1>
  //     </div>
  //   );


// ---------------- SAFE TEMP DATA (matches Teacher type) ----------------
const tempTeachers = {
  data: {
    count: 3,
    teachers: [
      {
        id: "T1",
        name: "Hitesh Choudhary",
        full_name: "Hitesh Choudhary",    // required by Teacher
        email: "hitesh@example.com",
        subject: "Web Development",
        experienceYears: 10,               // numeric version of experience
        joinedAt: "2015-06-12T00:00:00.000Z",
        createdAt: "2015-06-12T00:00:00.000Z", // required by Teacher
        status: "active",                  // e.g. "active" | "inactive"
        gender: "male",                    // match expected enum/string
      },
      {
        id: "T2",
        name: "Kunal Kushwaha",
        full_name: "Kunal Kushwaha",
        email: "kunal@example.com",
        subject: "DSA + Backend",
        experienceYears: 6,
        joinedAt: "2019-03-20T00:00:00.000Z",
        createdAt: "2019-03-20T00:00:00.000Z",
        status: "active",
        gender: "male",
      },
      {
        id: "T3",
        name: "Sanjana",
        full_name: "Sanjana",
        email: "sanjana@example.com",
        subject: "UI/UX Design",
        experienceYears: 4,
        joinedAt: "2021-09-01T00:00:00.000Z",
        createdAt: "2021-09-01T00:00:00.000Z",
        status: "active",
        gender: "female",
      },
    ],
  },
};

  return (
    <ReactQueryServerProvider>
      <div>
              <h1 className="text-4xl font-bold mb-2">Teachers</h1>

        <h2>Total teachers :{tempTeachers?.data.count}</h2>
        <DataTable
          columns={teacherColumn}
          data={tempTeachers?.data.teachers || []}
        />

      </div>
    </ReactQueryServerProvider>
  );
};

export default TeacherPage;


































