import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styles from '../DropDown.module.scss'
import { createFuzzyMatcher } from 'routes/MainPage/utils/getConsonantSearch'

interface IDropDownItemProps {
  keyWord: string
  searchWord: string
}

const DropDownItem = ({ keyWord, searchWord }: IDropDownItemProps) => {
  const regex = createFuzzyMatcher(searchWord.replace(/(\s*)/g, ''))
  const parts = keyWord.split(regex)
  const word = keyWord.match(regex)?.slice(1, searchWord.length + 1)

  return (
    <li>
      <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.serchIcon} />
      <span>
        {parts.map((part, index) =>
          word?.includes(part) ? <mark key={`${keyWord}-${searchWord}-${index + 1}`}>{part}</mark> : part
        )}
      </span>
    </li>
  )
}
export default DropDownItem
