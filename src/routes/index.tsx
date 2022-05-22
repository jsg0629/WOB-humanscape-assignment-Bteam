import { Routes, Route } from 'react-router-dom'

import { useAppSelector } from 'hooks'
import { getDiseaseError } from 'states/disease'

import ErrorBoundary from 'components/ErrorBoundary'
import MainPage from './MainPage'
import Header from './_shared/Header'
import Footer from './_shared/Footer'
import NotFound from './_shared/NotFound'
import styles from './Routes.module.scss'

const App = () => {
  const myError = useAppSelector(getDiseaseError)

  return (
    <div className={styles.appWrapper}>
      <Header />
      <ErrorBoundary myError={myError}>
        <div className={styles.app}>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </ErrorBoundary>
      <Footer />
    </div>
  )
}

export default App
