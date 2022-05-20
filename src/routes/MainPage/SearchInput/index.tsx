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

  const [SuggestedKeyword, setSuggestedKeyword] = useState([])
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  const { isLoading, data } = useGetDisease(debouncedValue)

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value)
    setSuggestedKeyword([])
  }

  useEffect(() => {
    if (!data) return
    setSuggestedKeyword(data)
    setIsOpenDropdown(true)
  }, [data])

  const handleOnCloseDropDonw = () => {
    setIsOpenDropdown(false)
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
      {isOpenDropdown && <DropDown SuggestedKeyword={SuggestedKeyword} isLoading={isLoading} />}
    </div>
  )
}

export default SerchInput
