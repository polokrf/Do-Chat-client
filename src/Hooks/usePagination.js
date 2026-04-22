import { useInfiniteQuery } from "@tanstack/react-query"
import { useAxios } from "./useAxios"

export const usePagination = (funKey, userId,url) => {
  const axiosInstance= useAxios()
  return useInfiniteQuery({
    queryKey:[ funKey,userId],
    enabled: !!userId && !!url,
    queryFn: async ({ pageParam = null }) => {
      const res = await axiosInstance.get(`${url}&cursor=${pageParam || ''}`)
      return res.data || []
    },
    getNextPageParam: lastPage => lastPage?.nextCursor,
    initialPageParam:null
  })
}