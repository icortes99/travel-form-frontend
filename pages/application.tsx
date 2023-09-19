import { useRouter } from 'next/router'
import { Suspense, lazy, useState } from 'react'
import useStepValidation from '../src/shared/hooks/step-validation.hook'
import Loading from '../src/shared/components/loading.component'

const DestinationView = lazy(() => import('../src/modules/applications/application-form/destination-view'))
const InfoView = lazy(() => import('../src/modules/applications/application-form/info-view'))
const HotelView = lazy(() => import('../src/modules/applications/application-form/hotel-view'))
const ContactView = lazy(() => import('../src/modules/applications/application-form/contact-view'))

export default function Application() {
  const [validation, setValidation] = useState('loading')

  useStepValidation({ min: 1, max: 4 })
    .then(() => setValidation('loaded'))
    .catch(err => setValidation('failed'))

  const router = useRouter()
  const { step, agency } = router.query
  let stepNumber = parseInt(step as string)

  return (
    <>
      {
        validation === 'loaded' ?
          <Suspense fallback={<Loading />}>
            {stepNumber === 1 && <DestinationView travelAcencyId={1} travelAgency={agency as string} />}
            {stepNumber === 2 && <InfoView />}
            {stepNumber === 3 && <HotelView passengers={3} />}
            {stepNumber === 4 && <ContactView calendlyLink='jjj' travelAgencyId={1} />}
          </Suspense>
          :
          <Loading />
      }
    </>
  )
}