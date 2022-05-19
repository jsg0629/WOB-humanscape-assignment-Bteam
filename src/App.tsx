import styles from './App.module.scss'
import { HeaderIcon } from 'assets/svgs/index'
import SerchInput from 'components/searchInput'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.appContainer}>
        <header>
          <HeaderIcon className={styles.headerIcon} />
        </header>
      </div>
      <main>
        <div className={styles.appContainer}>
          <h1>
            국내 모든 임상시험 검색하고
            <br /> 온라인으로 참여하기
          </h1>
          <SerchInput />
        </div>
      </main>
      <footer>
        <div className={styles.appContainer}>
          <div className={styles.footerTitle}>Wanted Frontend course Team6 B</div>
          <div className={styles.footerSubTitle}>노서현 | 마지혁 | 유인종 | 지수근 | 조혜빈</div>
        </div>
      </footer>
    </div>
  )
}

export default App
