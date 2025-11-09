import { ReactQueryServerProvider } from "@/context/ReactQueryServer";

const UpdateTeacherPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <ReactQueryServerProvider>
      <div>UpdateTeacherPage {id}</div>
    </ReactQueryServerProvider>
  );
};

export default UpdateTeacherPage;
