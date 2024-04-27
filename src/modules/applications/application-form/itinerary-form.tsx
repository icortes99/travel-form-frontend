import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as yup from 'yup'
import FormTemplate from './form-template'
import {
  Box,
  Divider
} from '@chakra-ui/react'
import Button from '../../../shared/components/button.component'
import { useTranslation } from '../../../shared/hooks'
import CardItinerary from '../../../shared/components/card-itinerary.component'
import { useAttractionsQuery, useHotelsInDestinyQuery } from '../../../shared/generated/graphql-schema'
import Loading from '../../../shared/components/loading.component'

interface HotelDictionary {
  [uuid: string]: { name: string; suite: { name: string; uuid: string }[] }
}

interface ItineraryViewProps {
  lsKey: string
  tripInfoKey: string
  attractionsKey: string
}

const ItineraryView: FC<ItineraryViewProps> = ({ lsKey, tripInfoKey, attractionsKey }: ItineraryViewProps) => {
  const router = useRouter()
  const { t } = useTranslation()
  const agency = 'fantastic-travel'
  const selectedDestiny: string = JSON.parse(window.localStorage.getItem(attractionsKey))?.destination || ''
  const attractions = useAttractionsQuery({
    fetchPolicy: 'cache-first',
    variables: {
      where: {
        uuid: selectedDestiny
      }
    }
  })
  const tripStart: string = JSON.parse(window.localStorage.getItem(tripInfoKey))?.startDate || '1900/01/01'
  const tripFinish: string = JSON.parse(window.localStorage.getItem(tripInfoKey))?.exitDate || '2999/01/01'
  const hotelAssistance: boolean = (JSON.parse(window.localStorage.getItem(tripInfoKey))?.lodging === 'true') || false
  const areCompanions: boolean = JSON.parse(window.localStorage.getItem(tripInfoKey))?.companions === 'true' || false
  const selectedAttractions: string[] = JSON.parse(window.localStorage.getItem(attractionsKey))?.attractions || []
  const hotelsInDestiny = useHotelsInDestinyQuery({
    variables: {
      where: {
        destination: {
          uuid: selectedDestiny
        },
        travelAgency: {
          slug: agency
        }
      }
    }
  })

  function convertHotelsQuery(data): HotelDictionary {
    const hotelDictionary: HotelDictionary = {}

    data?.map((item) => {
      const hotelName: string = item.hotel.name
      const hotelUuid: string = item.hotel.uuid
      const hotelSuites: { name: string, uuid: string }[] = item.hotel.suites

      hotelDictionary[hotelUuid] = {
        name: hotelName,
        suite: hotelSuites
      }
    })

    return hotelDictionary
  }

  const generateAttractionValues = (numAtts: number) => {
    return Array.from({ length: numAtts }, (_, i) => ({ start: '', finish: '', hotelType: '', roomType: '' }))
  }

  function attractionsOverlap(attractions): boolean {
    for (let i = 0; i < attractions.length; i++) {
      for (let j = i + 1; j < attractions.length; j++) {
        const attraction1 = attractions[i]
        const attraction2 = attractions[j]

        const start1 = new Date(attraction1.start)
        const end1 = new Date(attraction1.finish)
        const start2 = new Date(attraction2.start)
        const end2 = new Date(attraction2.finish)

        if (start1 <= end2 && start2 <= end1) {
          return false
        }
      }
    }
    return true
  }

  const attractionSchema = yup.object().shape({
    start: yup.date().min(tripStart, t('error.invalidDate')).max(tripFinish, t('error.invalidDate')).required(t('error.required')),
    finish: yup.date().min(tripStart, t('error.invalidDate')).max(tripFinish, t('error.invalidDate')).required(t('error.required')),
    hotelType: yup.string().required(t('error.required')),
    roomType: yup.string().required(t('error.required'))
  })

  const schema = yup.object().shape({
    attractionsDetails: yup.array().of(attractionSchema).test(
      'datesOverlap', t('error.datesOverlap'), function (attractions) {
        return attractionsOverlap(attractions)
      }
    )
  })

  const initialValues = JSON.parse(localStorage.getItem(lsKey)) || {
    attractionsDetails: generateAttractionValues(selectedAttractions.length)
  }

  //TODO: limpiar el roomType si el hotelType cambia. Validar que no este vacio ningun dropdown y que las fechas no se traslapen
  //TODO: Si las fechas se traslapan mostrar un error de fecha invalida
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: values => {
      window.localStorage.setItem(lsKey, JSON.stringify(values))
      if (areCompanions)
        router.push(`/application/${agency}?step=4`)
      else
        router.push(`/application/${agency}?step=5`)
    }
  })

  const handleItineraryChange = (itineraryIndex: number, input: string, value: any) => {
    const formikData = [...formik.values.attractionsDetails]
    const update = { ...formikData[itineraryIndex] }
    update[input] = value
    formikData[itineraryIndex] = update
    formik.setFieldValue('attractionsDetails', formikData)
  }

  const handleAttractionBlur = (field: string, attractionIndex: number) => {
    const updatedTouched = { ...formik.touched }
    const attractionTouched = updatedTouched.attractionsDetails || []
    attractionTouched[attractionIndex] = { ...attractionTouched[attractionIndex], [field]: true }
    updatedTouched.attractionsDetails = attractionTouched
    formik.setTouched(updatedTouched)
  }

  return (
    <FormTemplate
      title={'applicationForm.itinerary.title'}
      description={'applicationForm.itinerary.description'}
      step={2}
      pageTitle={'applicationForm.itinerary.stepName'}
      agencyName={agency}
    >
      <form
        onSubmit={formik.handleSubmit}
      >
        <Box
          width={'100%'}
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
          alignItems={'center'}
          marginBottom={{ sm: '2.5rem', md: '2rem', lg: '1.5rem' }}
        >
          {
            (!attractions.loading && !hotelsInDestiny.loading) ?
              (attractions.data?.destination?.attractions?.map((attraction, i) => (
                selectedAttractions.includes(attraction.uuid) &&
                <>
                  <CardItinerary
                    title={attraction.name}
                    image={attraction.images}
                    values={formik.values.attractionsDetails[i]}
                    onChange={handleItineraryChange}
                    isOk={(formik.touched?.attractionsDetails || [])[i]}
                    errors={(formik.errors?.attractionsDetails || [])[i]}
                    onBlur={(field) => handleAttractionBlur(field, i)}
                    cardId={i}
                    hotelAssistance={hotelAssistance}
                    hotelsValues={convertHotelsQuery(hotelsInDestiny.data?.hotelsInDestinationAgency)}
                  />
                  {
                    i < attractions.data.destination.attractions.length - 1 ?
                      <Divider
                        margin={'1.5rem 0'}
                        border={'.01rem solid rgba(128, 128, 128, 0.5)'}
                        key={i + 100}
                      />
                      : null
                  }
                </>
              )))
              : <Loading area={'partial'} />
          }
        </Box>
        <Box
          display={'flex'}
          width={'100%'}
          justifyContent={{ sm: 'space-evenly', lg: 'flex-end' }}
          gap={{ sm: '0', lg: '1.5rem' }}
          margin={{ sm: '.5rem 0 2rem', lg: '1.5rem 0 2rem' }}
        >
          <Button
            onClick={() => router.push(`/application/${agency}?step=2`)}
            text={t('buttons.back')}
            variant='outline'
          />
          <Button
            text={t('buttons.next')}
            type='submit'
          />
        </Box>
      </form>
    </FormTemplate>
  )
}

export default ItineraryView