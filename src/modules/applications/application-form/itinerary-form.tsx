import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as yup from 'yup'
import FormTemplate from './form-template'
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Image,
  Text
} from '@chakra-ui/react'
import Button from '../../../shared/components/button.component'
import { useTranslation } from '../../../shared/hooks'
import CardItinerary from '../../../shared/components/card-itinerary.component'

interface ItineraryViewProps {
  lsKey: string
  tripInfoKey: string
  attractionsKey: string
}

const ItineraryView: FC<ItineraryViewProps> = ({ lsKey, tripInfoKey, attractionsKey }: ItineraryViewProps) => {
  const router = useRouter()
  const { t } = useTranslation()
  const agency = 'FantasticTravel'
  const attractions: { uuid: string, name: string, images: string, description: string }[] = JSON.parse(window.localStorage.getItem(attractionsKey)) || [{
    uuid: 'dddd',
    name: 'Disney',
    images: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
    description: ''
  }, {
    uuid: 'dddd',
    name: 'Universal',
    images: 'data:image/jpeg;base64,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',
    description: ''
  }]
  const tripStart: string = JSON.parse(window.localStorage.getItem(tripInfoKey))?.startDate || '1900/01/01'
  const tripFinish: string = JSON.parse(window.localStorage.getItem(tripInfoKey))?.exitDate || '2999/01/01'
  const hotelAssistance: boolean = JSON.parse(window.localStorage.getItem(tripInfoKey))?.lodging || false

  //useAttractionsQuery - cache and network para las attractions

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
    hotelType: yup.string().required(t('error.required')),
    roomsType: yup.string().required(t('error.required')),
    attractionsDetails: yup.array().of(attractionSchema).test(
      'datesOverlap', t('error.datesOverlap'), function (attractions) {
        return attractionsOverlap(attractions)
      }
    )
  })

  const initialValues = JSON.parse(localStorage.getItem(lsKey)) || {
    hotelType: '',
    roomsType: '',
    attractionsDetails: generateAttractionValues(2)
  }

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: values => {
      window.localStorage.setItem(lsKey, JSON.stringify(values))
      router.push(`/application/${agency}?step=4`)
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
        >
          {
            attractions.map((attraction, i) => (
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
                />
                {
                  i < attractions.length - 1 ?
                    <Divider
                      margin={'1.5rem 0'}
                      border={'.01rem solid rgba(128, 128, 128, 0.5)'}
                      key={i + 100}
                    />
                    : null
                }
              </>
            ))
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