import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import styles from '../DropDown.module.scss'
import { createFuzzyMatcher } from 'routes/MainPage/utils/getConsonantSearch'

interface IDropDownItemProps {
  keyWord: string
  searchWord: string
  itemIndex: number
  focusedDropDownItemIndex: number
  setInputValue: Dispatch<SetStateAction<string>>
  setFocusedDropDownItemIndex: Dispatch<SetStateAction<number>>
  setFocusedDropDownItemTitle: Dispatch<SetStateAction<string>>
}

const DropDownItem = ({
  keyWord,
  searchWord,
  itemIndex,
  focusedDropDownItemIndex,
  setInputValue,
  setFocusedDropDownItemIndex,
  setFocusedDropDownItemTitle,
}: IDropDownItemProps) => {
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (itemIndex === focusedDropDownItemIndex) {
      setIsFocused(true)
      setFocusedDropDownItemTitle(keyWord)
    } else {
      setIsFocused(false)
    }
  }, [focusedDropDownItemIndex, itemIndex, isFocused, keyWord, setFocusedDropDownItemTitle])

  const handleMouseHoverEvent = () => {
    setFocusedDropDownItemIndex(itemIndex)
  }

  const handleDropDownItemClick = () => {
    setInputValue(keyWord)
  }

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
      <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
      <div>
        {searchWordArray.map((part, index) =>
          part === matchWord ? <mark key={`${keyWord}-${searchWord}-${index + 1}`}>{part}</mark> : part
        )}
      </div>
    </li>
  )
}

export default DropDownItem
