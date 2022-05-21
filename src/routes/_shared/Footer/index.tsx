import styles from './Footer.module.scss'

interface Props {}

const Footer = ({}: Props): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTitle}>Wanted Frontend course Team6 B</div>
      <div className={styles.footerSubTitle}>노서현 | 마지혁 | 유인종 | 지수근 | 조혜빈</div>
    </footer>
  )
}

export default Footer
