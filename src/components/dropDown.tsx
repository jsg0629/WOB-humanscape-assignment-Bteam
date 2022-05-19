import React from 'react'
import styles from './DropDown.module.scss'
import DropDownItem from './dropDownItem'
import { v4 as uuidv4 } from 'uuid'

const DropDown = ({ SuggestedKeyword }: { SuggestedKeyword: string[] }) => {
  console.log(SuggestedKeyword)
  if (SuggestedKeyword.length === 0) return <span />
  return (
    <div className={styles.dropDownWrapper}>
      <div className={styles.dropDownTitle}>추천검색어</div>
      <ul>
        {SuggestedKeyword.map((el: string) => {
          return <DropDownItem key={uuidv4()} keyWord={el} />
        })}
      </ul>
    </div>
  )
}

export default DropDown
