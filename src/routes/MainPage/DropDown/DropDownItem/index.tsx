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
  return (
    <li>
      <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.serchIcon} />
      <div>{keyWord}</div>
    </li>
  )
}

export default DropDownItem
