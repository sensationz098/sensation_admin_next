import AddCounsellorForm from "@/components/forms/AddCounsellorForm";
import AddTeacherForm from "@/components/forms/AddTeacherForm";
import DashboardCharts from "@/components/admin/DashboardCharts";
import StatsCard from "@/components/admin/StatsCard";
import AddCourseForm from "@/components/forms/AddCourseForm";
import { ReactQueryServerProvider } from "@/context/ReactQueryServer";
import { getDashboardData } from "@/server/serverApi";
import { GetDashboardApiReponseType } from "@/types/ApiResponseType";
import { QueryClient } from "@tanstack/react-query";
import {  Users } from "lucide-react";
import Link from "next/link";

const AdminHomePage = async () => {

  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 60 * 1000,
  //     },
  //   },
  // });

  // await queryClient.prefetchQuery({
  //   queryKey: ["dashboard"],
  //   queryFn: getDashboardData,
  // });

  // const dashboard = queryClient.getQueryData<GetDashboardApiReponseType | null>(
  //   ["dashboard"]
  // );

  // if (!dashboard)
  //   return (
  //     <div>
  //       <h1>{"Something went wrong"}</h1>
  //     </div>
  //   );

  return (
    <ReactQueryServerProvider>
      <div className="container mx-auto p-6">
<div className="flex space-x-4">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
  <AddTeacherForm />
  <AddCounsellorForm/>
      <AddCourseForm />

</div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
         
         <Link href="">
          <StatsCard
            title="Total Revenue"
            value={15416}
            // icon={Users}
            description="Total Revenue Amount"
          /></Link>

          <Link href={'/admin/dashboard/courses'}>
           <StatsCard
            title="Courses"
            value={15}
            // icon={Users}
            description="Total no of courses"
          /> 
          </Link>
          

          <Link href={'/admin/dashboard/students'}>
          
          <StatsCard
            title="Total Students"
            value={650}
            // icon={Users}
            description="Total no of student"
          /> 
          
          </Link>


<Link href={'/admin/dashboard/teachers'}>
          <StatsCard
            title="Total teachers"
            value={15}
            // icon={Users}
            description="Total no of teachers"
          />
</Link>



<Link href={'/admin/dashboard/counsellors'}>
          <StatsCard
            title="Total counsellor"
            value={15}
            // icon={Users}
            description="Total no of counsellors"
          />
</Link>
          

          <Link href={'/admin/dashboard/activeBatches'}>
           <StatsCard
            title="Active Batches"
            value={45}
            // icon={Users}
            description="Total no of active batches"
          /> 

          </Link>


<Link href="/admin/dashboard/transactions">
          
          <StatsCard
            title="Transactions"
            value={15}
            // icon={Users}
            description="Total no of transaction"
          /> 
          
          </Link>



<Link href="/admin/dashboard/transactionCoupon">

          <StatsCard
            title="Transaction coupan"
            value={15}
            // icon={Users}
            description="Total no of student"
          /> 
          </Link>
          
        
       


        </div>
{/* 
         <div>
        <AdminDashboardClient/>


        </div> */}
        

      <DashboardCharts/>
      </div>
    </ReactQueryServerProvider>
  );
};

export default AdminHomePage;
