import { useGetDisease } from 'hooks'

import SearchInput from 'routes/MainPage/SearchInput'
import styles from './MainPage.module.scss'

const MainPage = (): JSX.Element => {
  const { isFetched: getAllDataIsFetched } = useGetDisease({ searchWord: '', numOfRows: '2000', isGetAllData: true })

  return (
    <main className={styles.mainWrapper}>
      <h1 className={styles.title}>
        국내 모든 임상시험 검색하고
        <br /> 온라인으로 참여하기
      </h1>
      <SearchInput getAllDataIsFetched={getAllDataIsFetched} />
    </main>
  )
}

export default MainPage
