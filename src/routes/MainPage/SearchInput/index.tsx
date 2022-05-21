import { useState, useEffect, ChangeEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useOnClickOutside } from 'hooks/useOnClickOutside'

import { useAppSelector, useDebounce, useGetDisease } from 'hooks'

import DropDown from '../DropDown'
import styles from './SearchInput.module.scss'
import { getConsonantSearch } from '../utils/getConsonantSearch'
import { IDiseaseItem } from 'types/disease'
import { getDiseaseList } from 'states/disease'

const SerchInput = () => {
  const [inputValue, setInputValue] = useState('')
  const [isConsonant, setIsConsonant] = useState(false)
  const debouncedValue = useDebounce(inputValue, 500, setIsConsonant)

  const [suggestedKeyword, setSuggestedKeyword] = useState<IDiseaseItem[]>([])
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  const { isLoading, data: diseaseData } = useGetDisease({ searchWord: debouncedValue, isConsonant })

  const allDiseaseData = useAppSelector(getDiseaseList)

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setIsConsonant(false)
    setSuggestedKeyword([])
    setInputValue(e.currentTarget.value)
  }

  useEffect(() => {
    if (diseaseData?.length > 0) {
      setSuggestedKeyword(diseaseData)
    }

    if (isConsonant) {
      const result = getConsonantSearch(debouncedValue, allDiseaseData)
      setSuggestedKeyword(result)
    }

    setIsOpenDropdown(true)
  }, [allDiseaseData, debouncedValue, diseaseData, isConsonant])

  const handleOnCloseDropDonw = () => {
    setIsOpenDropdown(false)
    setInputValue('')
  }

  const backDropRef = useOnClickOutside(handleOnCloseDropDonw)

  const handleOnFocusInput = () => {
    setIsOpenDropdown(true)
  }

  return (
    <div className={styles.serchInputForm} ref={backDropRef}>
      <div className={styles.inputBox}>
        <form className={styles.form}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.serchIcon} />
          <input
            className={styles.serchInput}
            onChange={handleInputValue}
            onFocus={handleOnFocusInput}
            value={inputValue}
            type='text'
            placeholder='질환명을 입력해 주세요.'
          />
        </form>
      </div>
      <button type='submit'>검색</button>
      {isOpenDropdown && debouncedValue !== '' && (
        <DropDown suggestedKeyword={suggestedKeyword} isLoading={isLoading} searchWord={debouncedValue} />
      )}
    </div>
  )
}

export default SerchInput
