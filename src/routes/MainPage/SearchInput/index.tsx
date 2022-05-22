import { useState, useEffect, ChangeEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { IDiseaseItem } from 'types/disease'
import { useAppSelector, useDebounce, useGetDisease, useOnClickOutside } from 'hooks'
import { getConsonantSearch } from '../utils/getConsonantSearch'
import { getDiseaseList } from 'states/disease'

import DropDown from '../DropDown'
import styles from './SearchInput.module.scss'

const SerchInput = () => {
  const [inputValue, setInputValue] = useState('')
  const [isConsonant, setIsConsonant] = useState(false)
  const debouncedValue = useDebounce(inputValue, 500, setIsConsonant)

  const [suggestedKeyword, setSuggestedKeyword] = useState<IDiseaseItem[]>([])
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [focusedDropDownItemIndex, setFocusedDropDownItemIndex] = useState<number>(-1)

  const { isLoading, data: diseaseData } = useGetDisease({ searchWord: debouncedValue, isConsonant })

  const allDiseaseData = useAppSelector(getDiseaseList)

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
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

  const handleOnCloseDropDown = () => {
    setIsOpenDropdown(false)
    setInputValue('')
  }

  const backDropRef = useOnClickOutside(handleOnCloseDropDown)

  const handleOnFocusInput = () => {
    setIsOpenDropdown(true)
  }

  const handleKeyboardNavigation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestedKeyword.length) return

    const resultArrayLength = suggestedKeyword.length

    if (e.key === 'Escape') {
      setIsOpenDropdown(false)
      setFocusedDropDownItemIndex(-1)
    }

    if (e.key === 'ArrowDown') {
      if (focusedDropDownItemIndex === -1) {
        setIsOpenDropdown(true)
        setFocusedDropDownItemIndex(0)
      }

      if (focusedDropDownItemIndex !== -1) {
        setFocusedDropDownItemIndex((prev) => prev + 1)
      }

      if (focusedDropDownItemIndex !== -1 && focusedDropDownItemIndex === resultArrayLength - 1) {
        setFocusedDropDownItemIndex(0)
      }
    }

    if (e.key === 'ArrowUp') {
      if (focusedDropDownItemIndex === -1) {
        setFocusedDropDownItemIndex(0)
      }

      if (focusedDropDownItemIndex !== -1) {
        setFocusedDropDownItemIndex((prev) => prev - 1)
      }

      if (focusedDropDownItemIndex !== -1 && focusedDropDownItemIndex === 0) {
        setFocusedDropDownItemIndex(resultArrayLength - 1)
      }
    }
  }

  return (
    <div className={styles.serchInputForm} ref={backDropRef}>
      <div className={styles.inputBox}>
        <form className={styles.form}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.serchIcon} />
          <input
            className={styles.serchInput}
            onChange={handleOnChangeInput}
            onFocus={handleOnFocusInput}
            value={inputValue}
            type='text'
            placeholder='질환명을 입력해 주세요.'
            onKeyDown={handleKeyboardNavigation}
          />
        </form>
      </div>
      <button type='submit'>검색</button>
      {isOpenDropdown && debouncedValue !== '' && (
        <DropDown
          suggestedKeyword={suggestedKeyword}
          isLoading={isLoading}
          searchWord={debouncedValue}
          focusedDropDownItemIndex={focusedDropDownItemIndex}
          setInputValue={setInputValue}
          setFocusedDropDownItemIndex={setFocusedDropDownItemIndex}
        />
      )}
    </div>
  )
}

export default SerchInput
