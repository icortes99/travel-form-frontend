import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'
import useStepValidation from '../../src/shared/hooks/step-validation.hook'
import Loading from '../../src/shared/components/loading.component'

const DestinationForm = dynamic(() => import('../../src/modules/applications/application-form/destination-form'))
const TripInfoForm = dynamic(() => import('../../src/modules/applications/application-form/trip-info-form'))
const HotelForm = dynamic(() => import('../../src/modules/applications/application-form/hotel-form'))
const ContactForm = dynamic(() => import('../../src/modules/applications/application-form/contact-form'))

export default function Application() {
  const [validation, setValidation] = useState('loading')
  const localStorageKeys = ['destiny', 'trip-info', 'lodging', 'contact', 'agency']
  const router = useRouter()
  const { step, agency } = router.query

  useStepValidation({ min: 1, max: 4, setValidation: setValidation })

  let stepNumber = parseInt(step as string) ?? 1

  return (
    <>
      {
        validation === 'loaded' ?
          <Suspense fallback={<Loading />}>
            {stepNumber === 1 && <DestinationForm lsKey={localStorageKeys[0]} />}
            {stepNumber === 2 && <TripInfoForm lsKey={localStorageKeys[1]} />}
            {stepNumber === 3 && <HotelForm lsKey={localStorageKeys[2]} passengersKey={localStorageKeys[1]} destinyKey={localStorageKeys[0]} />}
            {stepNumber === 4 && <ContactForm lsKey={localStorageKeys[3]} allLSkeys={localStorageKeys} />}
          </Suspense>
          :
          <Loading />
      }
    </>
  )
}