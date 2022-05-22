import { useState, useEffect, ChangeEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { useDebounce, useGetDisease } from 'hooks'

import DropDown from '../DropDown'
import styles from './SearchInput.module.scss'

const SerchInput = () => {
  const [inputValue, setInputValue] = useState('')
  const debouncedValue = useDebounce(inputValue, 500)

  const [suggestedKeyword, setSuggestedKeyword] = useState([])
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [focusedDropDownItemIndex, setFocusedDropDownItemIndex] = useState<number>(-1)

  const { isLoading, data: diseaseData } = useGetDisease(debouncedValue)

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value)
    setSuggestedKeyword([])
  }

  useEffect(() => {
    if (!diseaseData) return
    setSuggestedKeyword(diseaseData)
    setIsOpenDropdown(true)
  }, [diseaseData])

  const handleOnCloseDropDown = () => {
    setIsOpenDropdown(false)
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
            onChange={handleInputValue}
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
          focusedDropDownItemIndex={focusedDropDownItemIndex}
          setInputValue={setInputValue}
          setFocusedDropDownItemIndex={setFocusedDropDownItemIndex}
        />
      )}
    </div>
  )
}

export default SerchInput
