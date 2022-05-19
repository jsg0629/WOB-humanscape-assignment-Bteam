import { useAppSelector } from 'hooks'
import { getDieaseError } from 'states/disease'

import SerchInput from 'routes/MainPage/SearchInput'
import ErrorBoundary from 'components/ErrorBoundary'
import styles from './MainPage.module.scss'

const MainPage = (): JSX.Element => {
  const myError = useAppSelector(getDieaseError)

  return (
    <main className={styles.mainWrapper}>
      <h1 className={styles.title}>
        국내 모든 임상시험 검색하고
        <br /> 온라인으로 참여하기
      </h1>
      <ErrorBoundary myError={myError}>
        <SerchInput />
      </ErrorBoundary>
    </main>
  )
}

export default MainPage
