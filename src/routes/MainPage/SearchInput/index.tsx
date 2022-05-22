import { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { IDiseaseItem } from 'types/disease'
import { useAppSelector, useDebounce, useGetDisease, useOnClickOutside } from 'hooks'
import { getConsonantSearch } from '../utils/getConsonantSearch'
import { getDiseaseList } from 'states/disease'

import DropDown from '../DropDown'
import styles from './SearchInput.module.scss'

interface ISearchInputProps {
  getAllDataIsFetched: boolean
}

const SearchInput = ({ getAllDataIsFetched }: ISearchInputProps) => {
  const [inputValue, setInputValue] = useState('')
  const [isConsonant, setIsConsonant] = useState(false)
  const debouncedValue = useDebounce(inputValue, 500, setIsConsonant)

  const [suggestedKeyword, setSuggestedKeyword] = useState<IDiseaseItem[]>([])
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [focusedDropDownItemIndex, setFocusedDropDownItemIndex] = useState<number>(-1)
  const [focusedDropDownItemTitle, setFocusedDropDownItemTitle] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
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
  }

  const backDropRef = useOnClickOutside(handleOnCloseDropDown)

  const handleOnFocusInput = () => {
    setIsOpenDropdown(true)
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleKeyboardNavigation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestedKeyword.length === 0) return
    const resultArrayLength = suggestedKeyword.length

    if (e.key === 'Escape') {
      setIsOpenDropdown(false)
      setFocusedDropDownItemIndex(-1)
      inputRef.current?.blur()
    }

    if (e.key === 'Enter') {
      setInputValue(focusedDropDownItemTitle)
      setIsOpenDropdown(false)
    }

    if (e.key === 'ArrowDown') {
      if (focusedDropDownItemIndex >= resultArrayLength - 1) {
        setFocusedDropDownItemIndex(-1)
      }
      setFocusedDropDownItemIndex((prev) => prev + 1)
    }
    if (e.key === 'ArrowUp') {
      if (focusedDropDownItemIndex <= 0) {
        setFocusedDropDownItemIndex(resultArrayLength)
      }
      setFocusedDropDownItemIndex((prev) => prev - 1)
    }
  }

  return (
    <div className={styles.searchInputForm} ref={backDropRef}>
      <div className={styles.inputBox}>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            onChange={handleOnChangeInput}
            onFocus={handleOnFocusInput}
            value={inputValue}
            type='text'
            placeholder='질환명을 입력해 주세요.'
            onKeyDown={handleKeyboardNavigation}
            ref={inputRef}
          />
        </form>
        <button type='submit'>검색</button>
      </div>

      {isOpenDropdown && debouncedValue !== '' && (
        <DropDown
          suggestedKeyword={suggestedKeyword}
          isLoading={isLoading}
          searchWord={debouncedValue}
          getAllDataIsFetched={getAllDataIsFetched}
          focusedDropDownItemIndex={focusedDropDownItemIndex}
          setInputValue={setInputValue}
          setFocusedDropDownItemIndex={setFocusedDropDownItemIndex}
          setFocusedDropDownItemTitle={setFocusedDropDownItemTitle}
        />
      )}
    </div>
  )
}

export default SearchInput
