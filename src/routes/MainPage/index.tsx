import styles from './MainPage.module.scss'
import SerchInput from 'routes/MainPage/SearchInput'

const MainPage = (): JSX.Element => {
  return (
    <main>
      <div className={styles.appContainer2}>
        <h1 className={styles.title}>
          국내 모든 임상시험 검색하고
          <br /> 온라인으로 참여하기
        </h1>
        <SerchInput />
      </div>
    </main>
  )
}

export default MainPage
