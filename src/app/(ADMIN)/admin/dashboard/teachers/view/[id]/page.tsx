"use client"

import CreateTeacherModal from "@/components/forms/AddTeacherForm";
import ProfileCard, { FieldConfig } from "@/components/common/ProfileCard";
import { ReactQueryServerProvider } from "@/context/ReactQueryServer";
import { getTeacherDetailsById } from "@/server/serverApi";
import { GetTeacherDetailsByIdType } from "@/types/ApiResponseType";
import { TeacherType } from "@/types/TeacherType";
import { QueryClient } from "@tanstack/react-query";


const ViewTeacherDetailsPage = async ({
   params,
 }: {
   params: Promise<{ id: string }>;
 }) => {
   const { id } = await params;

//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         staleTime: 60 * 1000,
//       },
//     },
//   });

//   await queryClient.prefetchQuery({
//     queryKey: ["teacher-details", id],
//     queryFn: () => getTeacherDetailsById(id),
//   });

//   const teacherDetail =
//     queryClient.getQueryData<GetTeacherDetailsByIdType | null>([
//       "teacher-details",
//       id,
//     ]);

//   if (!teacherDetail)
//     return (
//       <div>
//         <h1>{"Something went wrong"}</h1>
//       </div>
//     );

const teacherFields: FieldConfig<TeacherType>[] = [
  { key: "email", label: "Email", editable: true },
  { key: "phone_no", label: "Phone", editable: true },
  { key: "gender", label: "Gender", editable: true },
  { key: "state", label: "State", editable: true },
  { key: "subject", label: "Subject", editable: true },
  { key: "experience_years", label: "Experience (Years)", editable: true },
  { key: "qualification", label: "Qualification", editable: true },
  { key: "specialization", label: "Specialization", editable: true },
  { key: "join_date", label: "Joined", editable: false },
];

const teacher: TeacherType = {
  id,
  name: "Demo Teacher",
  email: "demo@example.com",
  phone_no: "9876543210",
  gender: "MALE",
  state: "Delhi",
  subject: "Kathak",
  experience_years: 5,
  qualification: "B.A. Dance",
  specialization: "Classical Dance",
  image_url: "/default-avatar.png",
  join_date: "2024-02-01",
};


  return (
    <ReactQueryServerProvider>
      <div>
           <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Teacher Profile</h1>
       
      </div>

        {/* <h1>{teacherDetail.data.name}</h1> */}

<ProfileCard
  data={teacher}           // TeacherType object
  fields={teacherFields}   // FieldConfig<TeacherType>[]
  titleKey="name"
  avatarKey="image_url"
  editable
  onSave={async (updated) => {
  }}
/>
   </div>
    </ReactQueryServerProvider>
  );
};

export default ViewTeacherDetailsPage;





