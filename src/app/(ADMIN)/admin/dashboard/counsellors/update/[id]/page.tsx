import { ReactQueryServerProvider } from "@/context/ReactQueryServer";

const UpdateCounsellorPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <ReactQueryServerProvider>
      <div>UpdateCounsellorPage {id}</div>
    </ReactQueryServerProvider>
  );
};

export default UpdateCounsellorPage;
