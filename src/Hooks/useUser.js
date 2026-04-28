import { useQuery } from "@tanstack/react-query";
import { useAxios } from "./useAxios"

export const useUser = (userId) => {
  const axiosInstance = useAxios();
  const { data } = useQuery({
    queryKey: ['user-one-by-id', userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/only-one-user?userId=${userId}`);
      return res.data
    }
  })

  return data;
}