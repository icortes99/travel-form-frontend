import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface StepValidationParams {
  min: number
  max: number
}

const useStepValidation = ({ min, max }: StepValidationParams) => {
  const router = useRouter()
  const { step } = router.query

  return new Promise<void>((resolve, reject) => {
    useEffect(() => {
      if (router.isReady) {
        const stepNumber = parseInt(step as string)
        if (isNaN(stepNumber) || stepNumber < min || stepNumber > max) {
          router.push('/404')
          reject('Invalid step')
        } else {
          resolve()
        }
      }
    }, [router.isReady])
  })
}

export default useStepValidation