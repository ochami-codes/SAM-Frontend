import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getGlobalTwoFactorSettings,
  updateGlobalTwoFactorEnforcement,
} from "@/src/lib/api/securitySettings";

export function useGlobalTwoFactorSettings() {
  const queryClient = useQueryClient();

  const settingsQuery = useQuery({
    queryKey: ["global-two-factor-settings"],
    queryFn: getGlobalTwoFactorSettings,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const updateMutation = useMutation({
    mutationFn: updateGlobalTwoFactorEnforcement,

    onSuccess: (updatedSettings) => {
      queryClient.setQueryData(
        ["global-two-factor-settings"],
        updatedSettings
      );
    },
  });

  return {
    ...settingsQuery,
    updateEnforcement: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
}