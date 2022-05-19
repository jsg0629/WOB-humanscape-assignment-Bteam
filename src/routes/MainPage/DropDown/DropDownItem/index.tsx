import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styles from '../DropDown.module.scss'

const DropDownItem = ({ keyWord }: { keyWord: string }) => {
  return (
    <li>
      <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.serchIcon} />
      <span>{keyWord}</span>
    </li>
  )
}

export default DropDownItem
