import dompurify from 'dompurify'

import { IDiseaseError } from 'types/disease'
import styles from './ErrorFallback.module.scss'

interface IErrorFallbackProps {
  error: Error
  myError: IDiseaseError
}

const ErrorFallback = ({ error, myError }: IErrorFallbackProps) => {
  const sanitizer = dompurify.sanitize

  const myErrorHandler = () => {
    window.location.reload()
  }

  return (
    <div role='alert' className={styles.wrapper}>
      <dl className={styles.errorBox}>
        <dt>Error Text </dt>
        {/* TODO: dangerous */}
        {/* eslint-disable-next-line react/no-danger */}
        <dd dangerouslySetInnerHTML={{ __html: sanitizer(myError.responseText) }} />
        <dd>{error.message}</dd>
      </dl>
      <dl className={styles.errorBox}>
        <dt>Request URL </dt>
        <dd>{myError.requestURL || '-'}</dd>
      </dl>
      <button type='button' onClick={myErrorHandler} className={styles.reloadButton}>
        새로고침
      </button>
    </div>
  )
}

export default ErrorFallback
