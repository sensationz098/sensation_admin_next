import { ReactQueryServerProvider } from "@/context/ReactQueryServer";
import { getTeacherDetailsById } from "@/server/serverApi";
import { GetTeacherDetailsByIdType } from "@/types/ApiResponseType";
import { QueryClient } from "@tanstack/react-query";

const ViewTeacherDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["teacher-details", id],
    queryFn: () => getTeacherDetailsById(id),
  });

  const teacherDetail =
    queryClient.getQueryData<GetTeacherDetailsByIdType | null>([
      "teacher-details",
      id,
    ]);

  if (!teacherDetail)
    return (
      <div>
        <h1>{"Something went wrong"}</h1>
      </div>
    );

  return (
    <ReactQueryServerProvider>
      <div>
        <h1>teacher details</h1>

        <h1>{teacherDetail.data.name}</h1>
      </div>
    </ReactQueryServerProvider>
  );
};

export default ViewTeacherDetailsPage;
