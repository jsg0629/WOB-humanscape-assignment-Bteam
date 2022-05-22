import { IDiseaseItem } from 'types/disease'
import DropDownItem from './DropDownItem'
import styles from './DropDown.module.scss'

interface IDropDownProps {
  suggestedKeyword: IDiseaseItem[]
  isLoading: boolean
  searchWord: string
  getAllDataIsFetched: boolean
}

const DropDown = ({ suggestedKeyword, isLoading, searchWord, getAllDataIsFetched }: IDropDownProps) => {
  return (
    <div className={styles.dropDownWrapper}>
      <div className={styles.dropDownTitle}>추천 검색어</div>
      {(isLoading || !getAllDataIsFetched) && <div className={styles.loading}>Loading...</div>}
      {!isLoading && getAllDataIsFetched && (
        <>
          {suggestedKeyword.length === 0 && <div className={styles.noResult}>추천 검색어가 없습니다.</div>}
          <ul>
            {suggestedKeyword.map((element: IDiseaseItem) => {
              return <DropDownItem key={element.sickCd} keyWord={element.sickNm} searchWord={searchWord} />
            })}
          </ul>
        </>
      )}
    </div>
  )
}

export default DropDown
