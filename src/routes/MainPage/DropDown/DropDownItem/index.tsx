import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styles from '../DropDown.module.scss'

interface IDropDownItemProps {
  keyWord: string
  searchWord: string
}

const DropDownItem = ({ keyWord, searchWord }: IDropDownItemProps) => {
  // eslint-disable-next-line no-console
  console.log(searchWord)
  return (
    <li>
      <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.serchIcon} />
      <div>{keyWord}</div>
    </li>
  )
}

export default DropDownItem
