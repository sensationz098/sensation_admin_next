import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export const ReactQueryServerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};
