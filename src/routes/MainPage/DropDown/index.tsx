import DropDownItem from './DropDownItem'
import styles from './DropDown.module.scss'
import { IDiseaseItem } from 'types/disease'

interface IDropDownProps {
  SuggestedKeyword: IDiseaseItem[]
  isLoading: boolean
}
const DropDown = ({ SuggestedKeyword, isLoading }: IDropDownProps) => {
  if (SuggestedKeyword.length === 0 && !isLoading) return <span />

  return (
    <div className={styles.dropDownWrapper}>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <>
          <div className={styles.dropDownTitle}>추천검색어</div>
          <ul>
            {SuggestedKeyword.map((element: IDiseaseItem) => {
              return <DropDownItem key={element.sickCd} keyWord={element.sickNm} />
            })}
          </ul>
        </>
      )}
    </div>
  )
}

export default DropDown
