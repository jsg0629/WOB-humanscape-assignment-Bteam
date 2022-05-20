import { NavLink } from 'react-router-dom'
import styles from './NotFound.module.scss'

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>404 Not Found</h1>
      <NavLink to='/'>Go Home</NavLink>
    </div>
  )
}

export default NotFound
