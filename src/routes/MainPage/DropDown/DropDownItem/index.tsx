import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import styles from '../DropDown.module.scss'

interface IDropDownItemProps {
  keyWord: string
  index: number
  focusedDropDownItemIndex: number
  searchWord: string
  setInputValue: Dispatch<SetStateAction<string>>
  setFocusedDropDownItemIndex: Dispatch<SetStateAction<number>>
}
const DropDownItem = ({
  keyWord,
  searchWord,
  index,
  focusedDropDownItemIndex,
  setInputValue,
  setFocusedDropDownItemIndex,
}: IDropDownItemProps) => {
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (index === focusedDropDownItemIndex) {
      setIsFocused(true)
    } else {
      setIsFocused(false)
    }
  }, [focusedDropDownItemIndex, index, isFocused, keyWord])

  const handleMouseHoverEvent = () => {
    setFocusedDropDownItemIndex(index)
  }

  const handleDropDownItemClick = () => {
    setInputValue(keyWord)
  }

  return (
    <li
      role='menuitem'
      className={cx({ [styles.isFocused]: isFocused })}
      onMouseMove={handleMouseHoverEvent}
      onClick={handleDropDownItemClick}
    >
      <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.serchIcon} />
      <div>{keyWord}</div>
    </li>
  )
}

export default DropDownItem
