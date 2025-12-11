const ViewCourseDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return <div>ViewCourseDetails {id}</div>;
};

export default ViewCourseDetails;
