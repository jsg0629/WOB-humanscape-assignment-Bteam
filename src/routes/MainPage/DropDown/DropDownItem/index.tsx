import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import styles from '../DropDown.module.scss'
import { createFuzzyMatcher } from 'routes/MainPage/utils/getConsonantSearch'

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

const DropDownItem = ({ keyWord, searchWord }: IDropDownItemProps) => {
  const regex = createFuzzyMatcher(searchWord)

  const matchWord = keyWord
    .match(regex)
    ?.slice(1, searchWord.length + 1)
    .join('')
  const exceptMatchWord = keyWord.split(`${matchWord}`)

  const searchWordArray = exceptMatchWord.join(`/${matchWord}/`).split('/')

  return (
    <li
      role='menuitem'
      className={cx({ [styles.isFocused]: isFocused })}
      onMouseMove={handleMouseHoverEvent}
      onClick={handleDropDownItemClick}
    >
      <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.serchIcon} />
      <span>
        {searchWordArray.map((part, index) =>
          part === matchWord ? <mark key={`${keyWord}-${searchWord}-${index + 1}`}>{part}</mark> : part
        )}
      </span>
    </li>
  )
}
export default DropDownItem
