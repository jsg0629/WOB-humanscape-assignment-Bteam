import { useQuery } from 'react-query'

import { getDisease } from 'services/disease'
import { setDiseaseList } from 'states/disease'
import { increment, countApi } from 'states/count'
import { useAppSelector, useAppDispatch } from 'hooks'

interface IUseGetDiseaseProps {
  searchWord: string
  numOfRows?: string
  isGetAllData?: boolean
  isConsonant?: boolean
}

const INITIAL_PARAMS = {
  pageNo: '1',
  sickType: '1',
  medTp: '2',
  diseaseType: 'SICK_NM',
}

export const useGetDisease = ({
  searchWord,
  numOfRows = '10',
  isGetAllData = false,
  isConsonant = false,
}: IUseGetDiseaseProps) => {
  const dispatch = useAppDispatch()
  const countApiCall = useAppSelector(countApi)

  return useQuery(
    ['getDiseaseApi', searchWord, isGetAllData],
    () => {
      // eslint-disable-next-line no-console
      console.log('API 호출 횟수:', countApiCall)
      dispatch(increment())

      return getDisease({
        searchText: searchWord,
        ...INITIAL_PARAMS,
        numOfRows,
      }).then((res) => {
        return res.data
      })
    },
    {
      staleTime: 6 * 50 * 1000,
      useErrorBoundary: true,
      enabled: (searchWord.trim() !== '' && !isConsonant && !isGetAllData) || isGetAllData,
      select: (value) => {
        if (!value || value === '') return []
        const searchedData = value.length ? value : [value]
        return searchedData
      },
      onSuccess: (value) => {
        if (isGetAllData) {
          dispatch(setDiseaseList(value))
        }
      },
    }
  )
}
