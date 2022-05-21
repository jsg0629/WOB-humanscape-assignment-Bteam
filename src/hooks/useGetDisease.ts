import { useQuery } from 'react-query'
import { getDisease } from 'services/disease'
import { setError } from 'states/disease'
import { IDiseaseError } from 'types/disease'
import { useAppDispatch } from './useAppDispatch'

export const useGetDisease = (searchWord: string) => {
  const dispatch = useAppDispatch()

  return useQuery(
    ['getDiseaseApi', searchWord],
    () => {
      console.log('호출')
      return getDisease({
        searchText: searchWord,
        pageNo: '1',
        numOfRows: '10',
        sickType: '1',
        medTp: '2',
        diseaseType: 'SICK_NM',
      }).then((res) => {
        return res.data
      })
    },
    {
      staleTime: 6 * 10 * 1000,
      refetchOnWindowFocus: true,
      useErrorBoundary: true,
      enabled: searchWord.trim() !== '',
      onError: (error: IDiseaseError) => {
        dispatch(setError(error))
      },
      select: (value) => {
        if (!value || value === '') return []
        const searchedData = value.length ? value : [value]
        return searchedData
      },
    }
  )
}
