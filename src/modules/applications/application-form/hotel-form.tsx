import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as yup from 'yup'
import FormTemplate from './form-template'
import InputDropdown from '../../../shared/components/input-dropdown.component'
import Passenger from '../../../shared/components/passenger.component'
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Image,
  Text
} from '@chakra-ui/react'
import Button from '../../../shared/components/button.component'
import Carousel from '../../../shared/components/carousel.component'
import { useTranslation } from '../../../shared/hooks'

interface HotelViewProps {
  lsKey: string
}

const HotelView: FC<HotelViewProps> = ({ lsKey }: HotelViewProps) => {
  const router = useRouter()
  const { t } = useTranslation()
  const habitaciones = []
  const agency = 'FantasticTravel'
  const passengers = 2
  for (let i = 1; i <= passengers; i++) {
    habitaciones.push(i)
  }

  const passengerSchema = yup.object().shape({
    name: yup.string().required(),
    lastName: yup.string().required(),
    birth: yup.date().required(),
    room: yup.string().required()
  })

  const schema = yup.object().shape({
    hotel: yup.string().required(),
    rooms: yup.number().required(),
    passengersData: yup.array().of(passengerSchema)
  })

  const formik = useFormik({
    initialValues: {
      hotel: '',
      rooms: '',
      passengersData: Array(passengers).fill({ name: '', lastName: '', birth: '', room: '' })
    },
    validationSchema: schema,
    onSubmit: values => {
      window.localStorage.setItem(lsKey, JSON.stringify(values))
      router.push(`/application/${agency}?step=4`)
    }
  })

  const handlePassengerChange = (index: number, updatedPassengerData: any) => {
    const updatedPassengersData = [...formik.values.passengersData]
    updatedPassengersData[index] = updatedPassengerData
    formik.setFieldValue('passengersData', updatedPassengersData)
  }

  //eliminar, informacion quemada
  const hotels = ['Disney', 'Universal', 'Other']

  //eliminar
  const hotelImages = [
    'https://mickeyvisit.com/wp-content/uploads/2020/01/top-off-site-walt-disney-world-hotels.jpg'
  ]

  return (
    <FormTemplate
      title={'applicationForm.lodging.title'}
      description={'applicationForm.lodging.description'}
      step={2}
    >
      <form
        onSubmit={formik.handleSubmit}
      >
        <Box
          width={'100%'}
          display={'flex'}
          justifyContent={'center'}
          flexDirection={{ sm: 'column', lg: 'row' }}
          alignItems={{ sm: 'center', lg: 'flex-start' }}
        >
          <Box
            width={{ sm: '100%', lg: '25%' }}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
          > {/* COLUMNA 1 */}
            <Box
              maxWidth={{ sm: '25rem', md: '25rem', lg: '100%' }}
              width={'100%'}
            >
              <Carousel images={hotelImages} mask={false} />
            </Box>
            <FormControl
              marginTop={'1.5rem'}
            >
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>{t('applicationForm.lodging.questions.hotel')}</FormLabel>
                <InputDropdown
                  options={hotels}
                  name='hotel'
                  placeholder='Tu hotel de preferencia'
                  value={formik.values.hotel}
                  onChange={formik.handleChange}
                />
              </Box>
              <Box>
                <FormLabel>{t('applicationForm.lodging.questions.rooms')}</FormLabel>
                <InputDropdown
                  options={habitaciones}
                  name='rooms'
                  placeholder='Las habitaciones que gustes'
                  value={formik.values.rooms}
                  onChange={formik.handleChange}
                />
              </Box>
            </FormControl>
          </Box>
          <Divider
            margin={'1.5rem 0'}
            display={{ sm: 'block', lg: 'none' }}
            border={'.01rem solid rgba(128, 128, 128, 0.5)'}
          />
          <Divider
            margin={'0 1.5rem'}
            display={{ sm: 'none', lg: 'block' }}
            orientation='vertical'
            minHeight={'31rem'}
            border={'.01rem solid rgba(128, 128, 128, 0.5)'}
          />
          <Box
            width={{ sm: '100%', lg: '75%' }}
          > {/* COLUMNA 2 */}
            <Text
              marginBottom={'1.5rem'}
            >
              {t('applicationForm.lodging.questions.message')}
            </Text>
            <Box>
              {
                (() => {
                  const renderPassengers = []
                  for (let i = 0; i < passengers; i++) {
                    renderPassengers.push(
                      <>
                        <Passenger
                          key={i}
                          passengerId={i + 1}
                          rooms={habitaciones.length}
                          value={formik.values.passengersData[i]}
                          onChange={(updatedValue) => handlePassengerChange(i, updatedValue)}
                        />
                        {
                          i < passengers - 1 ?
                            <Divider
                              margin={'.5rem 0 1rem 0'}
                              border={'.01rem solid rgba(128, 128, 128, 0.5)'}
                              key={i * 100}
                            /> : null
                        }
                      </>
                    )
                  }
                  return renderPassengers
                })()
              }
            </Box>
          </Box>
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

export default HotelView