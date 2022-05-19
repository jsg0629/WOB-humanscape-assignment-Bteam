import { Routes, Route } from 'react-router-dom'
import styles from './Routes.module.scss'

import MainPage from './MainPage'
import Header from './_shared/Header'
import Footer from './_shared/Footer'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <Header />
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
