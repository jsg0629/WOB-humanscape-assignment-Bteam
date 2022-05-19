import { useAppDispatch, useAppSelector } from 'hooks'
import { useEffect } from 'react'
import { getDieaseList, setDiseaseList } from 'states/disease'
import { getDisease } from 'services/disease'
import { useQuery } from 'react-query'
import { isAxiosError } from 'utils/axios'

const Dieases = () => {
  const dispatch = useAppDispatch()
  const diseaseList = useAppSelector(getDieaseList)

  const handleGetDiease = () => {
    console.log(diseaseList)
  }

  // const { data, isLoading } = useQuery(
  //   ['getDiseaseApi'],
  //   () =>
  //     getDisease({ searchText: '간', pageNo: '1', numOfRows: '10', sickType: '1', medTp: '2' }).then((res) => res.data),
  //   {
  //     refetchOnWindowFocus: true,
  //     suspense: true,
  //     useErrorBoundary: true,
  //     onError(err) {
  //       if (isAxiosError(err)) console.log(err)
  //     },
  //   }
  // )
  // console.log('datadata: ', data)
  // console.log(isLoading)
  getDisease({
    searchText: '간',
    pageNo: '1',
    numOfRows: '10',
    sickType: '1',
    medTp: '2',
    diseaseType: 'SICK_NM',
  }).then((res) => console.log(res.data))

  return (
    <button type='button' onClick={handleGetDiease}>
      Dieases
    </button>
  )
}

export default Dieases
