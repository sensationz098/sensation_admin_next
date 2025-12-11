"use client";

import ProfileCard, { FieldConfig } from "@/components/common/ProfileCard";

const ViewCounsellorPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  // TEMP DATA (must match CounsellorSelectType)
  const counsellor = {
    id,
    name: "Rahul Sharma",
    gender: "MALE",
    employee_id: "EMP101",
    contact: "9876543210",
    incentive: 1200.5,
    status: true,
    createdAt: "2024-01-05",
  };

  const counsellorFields: FieldConfig<typeof counsellor>[] = [
    { key: "gender", label: "Gender", editable: true },
    { key: "employee_id", label: "Employee ID", editable: true },
    { key: "contact", label: "Contact", editable: true },
    { key: "incentive", label: "Incentive", editable: true },
    { key: "status", label: "Active Status", editable: true },
    { key: "createdAt", label: "Joined", editable: false },
  ];

  return (
    <div>
        <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Counsellor Profile</h1>
       
      </div>
      <ProfileCard
        data={counsellor}
        fields={counsellorFields}
        titleKey="name"
        // avatarKey="image_url" 
        editable
        onSave={(updated) => {
        }}
      />
    </div>
  );
};

export default ViewCounsellorPage;
