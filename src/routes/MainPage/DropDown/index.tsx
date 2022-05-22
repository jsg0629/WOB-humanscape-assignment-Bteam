import { IDiseaseItem } from 'types/disease'
import DropDownItem from './DropDownItem'
import styles from './DropDown.module.scss'

interface IDropDownProps {
  suggestedKeyword: IDiseaseItem[]
  isLoading: boolean
  searchWord: string
  getAllDataIsFetched: boolean
}
<<<<<<< HEAD
// TODO: getAllDataIsFetched 지저분..
=======

>>>>>>> 3893066fc3d0eca781bd904501d011b5ba2df60a
const DropDown = ({ suggestedKeyword, isLoading, searchWord, getAllDataIsFetched }: IDropDownProps) => {
  return (
    <div className={styles.dropDownWrapper}>
      <div className={styles.dropDownTitle}>추천 검색어</div>
      {(isLoading || !getAllDataIsFetched) && <div className={styles.loading}>Loading...</div>}
<<<<<<< HEAD

=======
>>>>>>> 3893066fc3d0eca781bd904501d011b5ba2df60a
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
