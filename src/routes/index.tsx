import { Routes, Route } from 'react-router-dom'

import MainPage from './MainPage'
import Header from './_shared/Header'
import Footer from './_shared/Footer'
import NotFound from './_shared/NotFound'
import styles from './Routes.module.scss'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <Header />
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
