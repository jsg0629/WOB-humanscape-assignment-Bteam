import { Routes, Route } from 'react-router-dom'
import styles from './Routes.module.scss'

import MainPage from './MainPage'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
