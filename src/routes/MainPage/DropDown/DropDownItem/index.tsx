import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styles from '../DropDown.module.scss'
import HighLightItemCopy from './HighLightItemCopy'
// import dompurify from 'dompurify'
// import HighLightItem from './HighLightItem'

interface IDropDownItemProps {
  keyWord: string
  searchWord: string
}

// TODO: 수정
const DropDownItem = ({ keyWord, searchWord }: IDropDownItemProps) => {
  // const tempItemp = HighLightItem({ text: keyWord, searchWord })
  const tempItemp = HighLightItemCopy({ text: keyWord, searchWord })
  // const sanitizer = dompurify.sanitize
  return (
    // <li>
    //   <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.serchIcon} />
    //   <span dangerouslySetInnerHTML={{ __html: tempItemp }} />
    // </li>
    <li>
      <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.serchIcon} />
      <div>{tempItemp}</div>
    </li>
  )
}

export default DropDownItem
