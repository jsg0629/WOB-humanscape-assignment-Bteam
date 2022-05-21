import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styles from '../DropDown.module.scss'
import HighLightItem from './HighLightItem'
import dompurify from 'dompurify'

interface IDropDownItemProps {
  keyWord: string
  searchWord: string
}

const DropDownItem = ({ keyWord, searchWord }: IDropDownItemProps) => {
  const tempItemp = HighLightItem({ text: keyWord, query: searchWord })
  const sanitizer = dompurify.sanitize
  return (
    <li>
      <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.serchIcon} />
      <span dangerouslySetInnerHTML={{ __html: sanitizer(tempItemp) }} />
    </li>
  )
}

export default DropDownItem
