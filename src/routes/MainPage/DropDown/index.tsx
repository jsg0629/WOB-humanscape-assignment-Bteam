import React from 'react'
import styles from './DropDown.module.scss'
import DropDownItem from './DropDownItem'
import { v4 as uuidv4 } from 'uuid'

interface IDropDownProps {
  SuggestedKeyword: string[]
  isLoading: boolean
}
const DropDown = ({ SuggestedKeyword, isLoading }: IDropDownProps) => {
  console.log(SuggestedKeyword)
  if (SuggestedKeyword.length === 0) return <span />
  return (
    <div className={styles.dropDownWrapper}>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <>
          <div className={styles.dropDownTitle}>추천검색어</div>
          <ul>
            {SuggestedKeyword.map((el: string) => {
              return <DropDownItem key={uuidv4()} keyWord={el} />
            })}
          </ul>
        </>
      )}
    </div>
  )
}

export default DropDown
