import { DataTable } from "@/components/table/DataTable";
import { teacherColumn } from "@/components/table/TeacherColumn";
import { ReactQueryServerProvider } from "@/context/ReactQueryServer";
import { getAllTeachers } from "@/server/serverApi";
import { GetAllTeacherResponseType } from "@/types/ApiResponseType";
import { QueryClient } from "@tanstack/react-query";

const TeacherPage = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["teachers"],
    queryFn: getAllTeachers,
  });

  const teachers = queryClient.getQueryData<GetAllTeacherResponseType | null>([
    "teachers",
  ]);

  if (!teachers)
    return (
      <div>
        <h1>{"Something went wrong"}</h1>
      </div>
    );

  return (
    <ReactQueryServerProvider>
      <div>
        <h1>Total teachers :{teachers?.data.count}</h1>
        <DataTable
          columns={teacherColumn}
          data={teachers?.data.teachers || []}
        />
      </div>
    </ReactQueryServerProvider>
  );
};

export default TeacherPage;
