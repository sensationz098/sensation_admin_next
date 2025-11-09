import StatsCard from "@/components/admin/StatsCard";
import { ReactQueryServerProvider } from "@/context/ReactQueryServer";
import { getDashboardData } from "@/server/serverApi";
import { GetDashboardApiReponseType } from "@/types/ApiResponseType";
import { QueryClient } from "@tanstack/react-query";
import { BookOpen, DollarSign, GraduationCap, Users } from "lucide-react";

const AdminHomePage = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });

  const dashboard = queryClient.getQueryData<GetDashboardApiReponseType | null>(
    ["dashboard"]
  );

  if (!dashboard)
    return (
      <div>
        <h1>{"Something went wrong"}</h1>
      </div>
    );

  return (
    <ReactQueryServerProvider>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Students"
            value={dashboard?.data.totalStudents}
            icon={Users}
            description="Total no of student"
          />

          <StatsCard
            title="New Students"
            value={dashboard?.data.last3DaysStudents}
            icon={Users}
            description="New user logged last 3 days"
          />

          <StatsCard
            title="Total Teachers"
            value={dashboard?.data.totalTeachers}
            icon={GraduationCap}
            description="currently active teachers"
          />

          <StatsCard
            title="Active Courses"
            value={dashboard?.data.totalActiveCourses}
            icon={BookOpen}
            description="currently active courses"
          />

          <StatsCard
            title="Transactions"
            value={dashboard?.data.totalTransaction}
            icon={DollarSign}
            description="No of transactions done"
          />

          <StatsCard
            title="Total Amount"
            value={`₹${dashboard?.data.totalAmount.toLocaleString()}`}
            icon={DollarSign}
            description="Total amount before tax"
          />

          <StatsCard
            title="Total Tax"
            value={`₹${dashboard?.data.totalTax.toLocaleString()}`}
            icon={DollarSign}
            description="Total tax collected"
          />

          <StatsCard
            title="Grand Total"
            value={`₹${dashboard?.data.totalGrandTotal.toLocaleString()}`}
            icon={DollarSign}
            description="Total amount after tax"
          />
        </div>
      </div>
    </ReactQueryServerProvider>
  );
};

export default AdminHomePage;
