import React, { useState, useEffect } from 'react'
import styles from './SearchInput.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import DropDown from '../DropDown'
import { getDisease } from 'services/disease'

const SerchInput = () => {
  const [inputValue, setInputValue] = useState('')
  const [SuggestedKeyword, setSuggestedKeyword] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value)
  }
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    console.log('')
    if (inputValue === '') return setSuggestedKeyword([])
    getDisease({
      searchText: inputValue,
      pageNo: '1',
      numOfRows: '10',
      sickType: '1',
      medTp: '2',
      diseaseType: 'SICK_NM',
    }).then((res) => {
      const data = res.data.response.body.items.item
      if (data) {
        const filteredDate = data.map((el: { sickCd: string; sickNm: string }) => el.sickNm)
        setSuggestedKeyword(filteredDate)
      }
    })
  }, [inputValue])
  return (
    <div className={styles.serchInputForm}>
      <div className={styles.inputBox}>
        <form>
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
      <DropDown SuggestedKeyword={SuggestedKeyword} isLoading={isLoading} />
    </div>
  )
}

export default SerchInput
