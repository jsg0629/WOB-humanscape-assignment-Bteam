import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'

import useDebounce from 'hooks/useDebounce'
import { getDisease } from 'services/disease'

import styles from './SearchInput.module.scss'
import DropDown from '../DropDown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch } from 'hooks'
import { setError } from 'states/disease'
import { IDiseaseError } from 'types/disease'

export const useGetDisease = (searchWord: string) => {
  const dispatch = useAppDispatch()
  return useQuery(
    ['getDiseaseApi', searchWord],
    () =>
      getDisease({
        searchText: searchWord,
        pageNo: '1',
        numOfRows: '10',
        sickType: '1',
        medTp: '2',
        diseaseType: 'SICK_NM',
      }).then((res) => res?.data?.response?.body.items),
    {
      staleTime: 6 * 10 * 1000,
      useErrorBoundary: true,
      onError: (error: IDiseaseError) => {
        dispatch(setError(error))
      },
    }
  )
}

const SerchInput = () => {
  const [inputValue, setInputValue] = useState('')
  const [SuggestedKeyword, setSuggestedKeyword] = useState([])

  const debouncedValue = useDebounce(inputValue, 300)
  const { isLoading, data } = useGetDisease(debouncedValue)

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value)
  }

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (debouncedValue.trim() === '' || !data) setSuggestedKeyword([])
    else if (data) {
      const searchedData = data.item.length ? data.item : [data.item]
      const filteredData = searchedData.map((el: { sickCd: string; sickNm: string }) => el.sickNm)
      setSuggestedKeyword(filteredData)
    }
  }, [debouncedValue, data])

  return (
    <div className={styles.serchInputForm}>
      <div className={styles.inputBox}>
        <form className={styles.form}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.serchIcon} />
          <input
            className={styles.serchInput}
            onChange={handleInputValue}
            value={inputValue}
            type='text'
            placeholder='질환명을 입력해 주세요.'
          />
        </form>
      </div>
      <button type='submit'>검색</button>
      {debouncedValue.trim() !== '' && <DropDown SuggestedKeyword={SuggestedKeyword} isLoading={isLoading} />}
    </div>
  )
}

export default SerchInput
