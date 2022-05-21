import DropDownItem from './DropDownItem'
import styles from './DropDown.module.scss'
import { IDiseaseItem } from 'types/disease'

interface IDropDownProps {
  suggestedKeyword: IDiseaseItem[]
  isLoading: boolean
}

const DropDown = ({ suggestedKeyword, isLoading }: IDropDownProps) => {
  return (
    <div className={styles.dropDownWrapper}>
      <div className={styles.dropDownTitle}>추천 검색어</div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <>
          {suggestedKeyword.length === 0 && <div>추천검색어가 없습니다.</div>}
          <ul>
            {suggestedKeyword.map((element: IDiseaseItem) => {
              return <DropDownItem key={element.sickCd} keyWord={element.sickNm} />
            })}
          </ul>
        </>
      )}
    </div>
  )
}

export default DropDown
