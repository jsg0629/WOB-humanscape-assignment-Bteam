import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styles from '../DropDown.module.scss'
import { createFuzzyMatcher } from 'routes/MainPage/utils/getConsonantSearch'

interface IDropDownItemProps {
  keyWord: string
  searchWord: string
}

const DropDownItem = ({ keyWord, searchWord }: IDropDownItemProps) => {
  const regex = createFuzzyMatcher(searchWord)

  const matchWord = keyWord
    .match(regex)
    ?.slice(1, searchWord.length + 1)
    .join('')
  const exceptMatchWord = keyWord.split(`${matchWord}`)

  const searchWordArray = exceptMatchWord.join(`/${matchWord}/`).split('/')
  // TODO: span 수정, 위로 따로 빼기?
  return (
    <li>
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
