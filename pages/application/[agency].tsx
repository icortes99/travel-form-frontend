import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'
import useStepValidation from '../../src/shared/hooks/step-validation.hook'
import Loading from '../../src/shared/components/loading.component'

const DestinationForm = dynamic(() => import('../../src/modules/applications/application-form/destination-form'))
const TripInfoForm = dynamic(() => import('../../src/modules/applications/application-form/trip-info-form'))
const ItineraryView = dynamic(() => import('../../src/modules/applications/application-form/itinerary-form'))
const PassengersView = dynamic(() => import('../../src/modules/applications/application-form/passengers-form'))
const ContactForm = dynamic(() => import('../../src/modules/applications/application-form/contact-form'))

export default function Application() {
  const [validation, setValidation] = useState('loading')
  const localStorageKeys = ['destiny', 'trip-info', 'itinerary', 'passengers', 'contact', 'agency']
  const router = useRouter()
  const { step, agency } = router.query

  useStepValidation({ min: 1, max: 5, setValidation: setValidation })

  let stepNumber = parseInt(step as string) ?? 1

  return (
    <>
      {
        validation === 'loaded' ?
          <Suspense fallback={<Loading />}>
            {stepNumber === 1 && <DestinationForm lsKey={localStorageKeys[0]} />}
            {stepNumber === 2 && <TripInfoForm lsKey={localStorageKeys[1]} attractionsKey={localStorageKeys[0]} />}
            {stepNumber === 3 && <ItineraryView lsKey={localStorageKeys[2]} tripInfoKey={localStorageKeys[1]} attractionsKey={localStorageKeys[0]} />}
            {stepNumber === 4 && <PassengersView lsKey={localStorageKeys[3]} passengersKey={localStorageKeys[1]} />}
            {stepNumber === 5 && <ContactForm lsKey={localStorageKeys[4]} allLSkeys={localStorageKeys} />}
          </Suspense>
          :
          <Loading />
      }
    </>
  )
}