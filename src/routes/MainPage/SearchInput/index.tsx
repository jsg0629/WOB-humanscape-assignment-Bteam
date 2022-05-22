import { useState, useEffect, ChangeEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { IDiseaseItem } from 'types/disease'
import { useAppSelector, useDebounce, useGetDisease, useOnClickOutside } from 'hooks'
import { getConsonantSearch } from '../utils/getConsonantSearch'
import { getDiseaseList } from 'states/disease'

import DropDown from '../DropDown'
import styles from './SearchInput.module.scss'

interface ISerchInputProps {
  getAllDataIsFetched: boolean
}

const SerchInput = ({ getAllDataIsFetched }: ISerchInputProps) => {
  const [inputValue, setInputValue] = useState('')
  const [isConsonant, setIsConsonant] = useState(false)
  const debouncedValue = useDebounce(inputValue, 500, setIsConsonant)

  const [suggestedKeyword, setSuggestedKeyword] = useState<IDiseaseItem[]>([])
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  const { isLoading, data: diseaseData } = useGetDisease({ searchWord: debouncedValue, isConsonant })

  const allDiseaseData = useAppSelector(getDiseaseList)

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value)
    setSuggestedKeyword([])
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
            onChange={handleOnChangeInput}
            onFocus={handleOnFocusInput}
            value={inputValue}
            type='text'
            placeholder='질환명을 입력해 주세요.'
          />
        </form>
        <button type='submit'>검색</button>
      </div>

<<<<<<< HEAD
      {/* TODO: debouncedValue !== '' 필요? */}
=======
>>>>>>> 3893066fc3d0eca781bd904501d011b5ba2df60a
      {isOpenDropdown && debouncedValue !== '' && (
        <DropDown
          suggestedKeyword={suggestedKeyword}
          isLoading={isLoading}
          searchWord={debouncedValue}
          getAllDataIsFetched={getAllDataIsFetched}
        />
      )}
    </div>
  )
}

export default SerchInput
