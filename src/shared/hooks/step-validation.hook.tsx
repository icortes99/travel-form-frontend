import { useEffect, startTransition } from 'react'
import { useRouter } from 'next/router'

interface StepValidationParams {
  min: number
  max: number
  setValidation: (value: string) => void
}

const useStepValidation = ({ min, max, setValidation }: StepValidationParams) => {
  const router = useRouter()
  const { step } = router.query

  useEffect(() => {
    const validateStep = () => {
      if (router.isReady) {
        startTransition(() => {
          const stepNumber = parseInt(step as string)
          if (isNaN(stepNumber) || stepNumber < min || stepNumber > max) {
            router.push('/404')
            setValidation('failed')
          } else {
            setValidation('loaded')
          }
        })
      }
    }

    validateStep()
  }, [router.isReady, setValidation])
}

export default useStepValidation