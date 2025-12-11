import { counsellorColumn } from "@/components/table/CounsellorColumn";
import { DataTable } from "@/components/table/DataTable";
import { ReactQueryServerProvider } from "@/context/ReactQueryServer";
// import { getAllCounsellors } from "@/server/serverApi";
// import { GetAllCounsellorResponseType } from "@/types/ApiResponseType";
// import { QueryClient } from "@tanstack/react-query";

const CounsellorPage = async () => {

  // --- TEMP STATIC DATA (Structure must match CounsellorSelectType) ----
  const tempCounsellors = {
    data: {
      count: 3,
      counsellors: [
        {
          id: "C1",
          name: "Rahul Sharma",
          gender: "MALE",
          employee_id: "EMP101",
          contact: "9876543210",
          incentive: 1200.5,
          status: true,
          createdAt: "2024-01-05T00:00:00.000Z",
        },
        {
          id: "C2",
          name: "Priya Singh",
          gender: "FEMALE",
          employee_id: "EMP102",
          contact: "9123456780",
          incentive: 1500,
          status: true,
          createdAt: "2023-11-10T00:00:00.000Z",
        },
        {
          id: "C3",
          name: "Arjun",
          gender: "MALE",
          employee_id: "EMP103",
          contact: "9988776655",
          incentive: 1000,
          status: false,
          createdAt: "2023-05-15T00:00:00.000Z",
        },
      ],
    },
  };

  return (
    <ReactQueryServerProvider>
      <div>
              <h1 className="text-4xl font-bold mb-2">Counsellors</h1>

        <h2>Total Counsellors : {tempCounsellors.data.count}</h2>

        <DataTable
          columns={counsellorColumn} 
          data={tempCounsellors.data.counsellors}
        />
      </div>
    </ReactQueryServerProvider>
  );
};

export default CounsellorPage;
