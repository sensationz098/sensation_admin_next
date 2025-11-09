import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { toast } from "sonner";

interface GenericMutationOptions<TData, TError, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  invalidateKeys?: string[][];
  onSuccessMessage?: string;
  onErrorMessage?: string;
  optimisticUpdate?: boolean;
}

export function useReactMutation<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown
>(
  options: GenericMutationOptions<TData, TError, TVariables> &
    Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">
): UseMutationResult<TData, TError, TVariables, TContext> {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: options.mutationFn,
    onSuccess: (data, variables, context) => {
      // Invalidate queries
      if (options.invalidateKeys) {
        options.invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }

      // Show success message
      if (options.onSuccessMessage) {
        toast.success(options.onSuccessMessage);
      }

      // Call custom onSuccess if provided
      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      // Show error message
      const message = options.onErrorMessage || "An error occurred";
      toast.error(message);

      // Call custom onError if provided
      options.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      // Call custom onSettled if provided
      options.onSettled?.(data, error, variables, context);
    },
  });
}
