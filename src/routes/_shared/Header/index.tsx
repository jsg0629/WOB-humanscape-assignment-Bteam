import styles from './Header.module.scss'
import { HeaderIcon } from 'assets/svgs/index'

interface Props {}

const Header = ({}: Props): JSX.Element => {
  return (
    <header className={styles.header}>
      <HeaderIcon className={styles.headerIcon} />
    </header>
  )
}

export default Header
