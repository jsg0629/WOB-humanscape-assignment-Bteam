import styles from './ErrorFallback.module.scss'

interface IErrorFallbackProps {
  error: Error
}

const ErrorFallback = ({ error }: IErrorFallbackProps) => {
  const myErrorHandler = () => {
    window.location.reload()
  }

  return (
    <div role='alert' className={styles.wrapper}>
      <dl className={styles.errorBox}>
        <dt>Error Message </dt>
        <dd>{error.message}</dd>
      </dl>

      <button type='button' onClick={myErrorHandler} className={styles.reloadButton}>
        새로고침
      </button>
    </div>
  )
}

export default ErrorFallback
