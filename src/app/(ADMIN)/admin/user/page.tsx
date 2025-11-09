import { DataTable } from "@/components/table/DataTable";
import { userColumns } from "@/components/table/UserColumns";
import { getAllUsers } from "@/server/api";
import { GetAllUserResponseType } from "@/types/ApiResponseType";
import { QueryClient } from "@tanstack/react-query";

import AddUserForm from "@/components/forms/AddUserForm";

const UserPage = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const users = queryClient.getQueryData<GetAllUserResponseType | null>([
    "users",
  ]);

  if (!users)
    return (
      <div>
        <h1>{"Something went wrong"}</h1>
      </div>
    );

  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <h1>Total users : {users?.data.count || 0}</h1>

        <AddUserForm />
      </div>
      <DataTable columns={userColumns} data={users?.data.users || []} />
    </div>
  );
};

export default UserPage;
