import { useRouter } from 'next/router'
import { Suspense, lazy, useState } from 'react'
import useStepValidation from '../../src/shared/hooks/step-validation.hook'
import Loading from '../../src/shared/components/loading.component'

const DestinationForm = lazy(() => import('../../src/modules/applications/application-form/destination-form'))
const TripInfoForm = lazy(() => import('../../src/modules/applications/application-form/trip-info-form'))
const HotelForm = lazy(() => import('../../src/modules/applications/application-form/hotel-form'))
const ContactForm = lazy(() => import('../../src/modules/applications/application-form/contact-form'))

export default function Application() {
  const [validation, setValidation] = useState('loading')
  const [people, setPeople] = useState(0)

  useStepValidation({ min: 1, max: 4 })
    .then(() => setValidation('loaded'))
    .catch(err => setValidation('failed'))

  const router = useRouter()
  const { step, agency } = router.query
  let stepNumber = parseInt(step as string) ?? 1

  return (
    <>
      {
        validation === 'loaded' ?
          <Suspense fallback={<Loading />}>
            {stepNumber === 1 && <DestinationForm travelAcencyId={1} travelAgency={'hard coded'} />}
            {stepNumber === 2 && <TripInfoForm setPassengers={setPeople} />}
            {stepNumber === 3 && <HotelForm passengers={people as number} />}
            {stepNumber === 4 && <ContactForm calendlyLink='jjj' travelAgencyId={1} />}
          </Suspense>
          :
          <Loading />
      }
    </>
  )
}