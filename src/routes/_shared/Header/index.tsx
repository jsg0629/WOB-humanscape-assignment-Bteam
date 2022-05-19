import styles from './Header.module.scss'
import { HeaderIcon } from 'assets/svgs/index'

const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <HeaderIcon className={styles.headerIcon} />
    </header>
  )
}

export default Header
