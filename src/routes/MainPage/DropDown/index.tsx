import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'

import DropDownItem from './DropDownItem'
import { IDiseaseItem } from 'types/disease'
import styles from './DropDown.module.scss'

interface IDropDownProps {
  suggestedKeyword: IDiseaseItem[]
  isLoading: boolean
  searchWord: string
  getAllDataIsFetched: boolean
  focusedDropDownItemIndex: number
  setInputValue: Dispatch<SetStateAction<string>>
  setFocusedDropDownItemIndex: Dispatch<SetStateAction<number>>
  setFocusedDropDownItemTitle: Dispatch<SetStateAction<string>>
}

const DropDown = ({
  suggestedKeyword,
  isLoading,
  searchWord,
  getAllDataIsFetched,
  focusedDropDownItemIndex,
  setInputValue,
  setFocusedDropDownItemIndex,
  setFocusedDropDownItemTitle,
}: IDropDownProps) => {
  const dropDownCleanUp = useCallback(() => {
    setFocusedDropDownItemIndex(-1)
    setFocusedDropDownItemTitle('')
  }, [setFocusedDropDownItemIndex, setFocusedDropDownItemTitle])

  useEffect(() => {
    return dropDownCleanUp
  }, [dropDownCleanUp, suggestedKeyword])

  return (
    <div className={styles.dropDownWrapper}>
      <div className={styles.dropDownTitle}>추천 검색어</div>
      {(isLoading || !getAllDataIsFetched) && <div className={styles.loading}>Loading...</div>}
      {!isLoading && getAllDataIsFetched && (
        <>
          {suggestedKeyword.length === 0 && <div className={styles.noResult}>추천 검색어가 없습니다.</div>}
          <ul>
            {suggestedKeyword.map((element: IDiseaseItem, index: number) => {
              return (
                <DropDownItem
                  key={element.sickCd}
                  keyWord={element.sickNm}
                  searchWord={searchWord}
                  itemIndex={index}
                  focusedDropDownItemIndex={focusedDropDownItemIndex}
                  setInputValue={setInputValue}
                  setFocusedDropDownItemIndex={setFocusedDropDownItemIndex}
                  setFocusedDropDownItemTitle={setFocusedDropDownItemTitle}
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
