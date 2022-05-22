import { Dispatch, SetStateAction, useEffect } from 'react'

import DropDownItem from './DropDownItem'
import { IDiseaseItem } from 'types/disease'
import styles from './DropDown.module.scss'

interface IDropDownProps {
  suggestedKeyword: IDiseaseItem[]
  isLoading: boolean
  searchWord: string
  focusedDropDownItemIndex: number
  setInputValue: Dispatch<SetStateAction<string>>
  setFocusedDropDownItemIndex: Dispatch<SetStateAction<number>>
}

const DropDown = ({
  suggestedKeyword,
  isLoading,
  focusedDropDownItemIndex,
  searchWord,
  setInputValue,
  setFocusedDropDownItemIndex,
}: IDropDownProps) => {
  useEffect(() => {
    return setFocusedDropDownItemIndex(-1)
  }, [setFocusedDropDownItemIndex, suggestedKeyword])

  return (
    <div className={styles.dropDownWrapper}>
      <div className={styles.dropDownTitle}>추천 검색어</div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <>
          {suggestedKeyword.length === 0 && <div>추천 검색어가 없습니다.</div>}
          <ul>
            {suggestedKeyword.map((element: IDiseaseItem, index: number) => {
              return (
                <DropDownItem
                  key={element.sickCd}
                  keyWord={element.sickNm}
                  searchWord={searchWord}
                  index={index}
                  focusedDropDownItemIndex={focusedDropDownItemIndex}
                  setInputValue={setInputValue}
                  setFocusedDropDownItemIndex={setFocusedDropDownItemIndex}
                />
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}

export default DropDown
