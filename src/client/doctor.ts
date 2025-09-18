import { skipToken, useQuery } from '@tanstack/react-query'

import { searchDoctors } from '@/lib/doctors'

export const useSearchDoctorQuery = (query: string) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['doctors', query],
    queryFn: query ? async () => await searchDoctors(query) : skipToken,
    enabled: !!query
  })

  return { data, isLoading, isFetching, isError }
}
