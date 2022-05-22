import { Routes, Route } from 'react-router-dom'

import MainPage from './MainPage'
import Header from './_shared/Header'
import Footer from './_shared/Footer'
import NotFound from './_shared/NotFound'
import styles from './Routes.module.scss'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from 'components/ErrorBoundary/ErrorFallback'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <Header />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
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
