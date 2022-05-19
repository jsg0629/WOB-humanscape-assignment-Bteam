import { ReactNode } from 'react'
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary'
import { IDiseaseError } from 'types/disease'
import ErrorFallback from './ErrorFallback'

interface IErrorBoundaryProps {
  children: ReactNode
  myError: IDiseaseError
}

const ErrorBoundary = ({ children, myError }: IErrorBoundaryProps) => {
  const handleFallback = (props: FallbackProps) => {
    return <ErrorFallback {...props} myError={myError} />
  }

  return <ReactErrorBoundary FallbackComponent={handleFallback}>{children}</ReactErrorBoundary>
}

export default ErrorBoundary
