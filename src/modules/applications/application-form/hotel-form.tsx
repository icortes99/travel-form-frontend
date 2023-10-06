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

interface HotelViewProps {
  lsKey: string
}

const HotelView: FC<HotelViewProps> = ({ lsKey }: HotelViewProps) => {
  const router = useRouter()
  const habitaciones = []
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
      router.push('/application/f95a3f7e-6a1f-4326-8718-fa439a3c5306?step=4')
    }
  })

  const handlePassengerChange = (index: number, updatedPassengerData: any) => {
    const updatedPassengersData = [...formik.values.passengersData]
    updatedPassengersData[index] = updatedPassengerData
    formik.setFieldValue('passengersData', updatedPassengersData)
  }

  //eliminar, informacion quemada
  const hotels = ['Disney', 'Universal', 'Other']

  return (
    <FormTemplate
      title='Hospedaje'
      description='Comenzaremos con el destino que deseas visitar, te brindamos toda la información necesaria para que tomes la mejor decisión.'
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
            <Image
              maxWidth={'25rem'}
              width={'100%'}
              aspectRatio={'1/1'}
              objectFit={'cover'}
              borderRadius={'.9rem'}
              alt='hotel image'
              src='https://mickeyvisit.com/wp-content/uploads/2020/01/top-off-site-walt-disney-world-hotels.jpg'
            />
            <FormControl
              marginTop={'1.5rem'}
            >
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>Hotel de preferencia:</FormLabel>
                <InputDropdown
                  options={hotels}
                  name='hotel'
                  placeholder='Tu hotel de preferencia'
                  value={formik.values.hotel}
                  onChange={formik.handleChange}
                />
              </Box>
              <Box>
                <FormLabel>Número de habitaciones:</FormLabel>
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
              Por defecto, tú serás asignado a la habitación A en todas las ocasiones, así que ten esto en cuenta a la hora de asociar las habitaciones.
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
            onClick={() => router.push('/application/f95a3f7e-6a1f-4326-8718-fa439a3c5306?step=2')}
            text='Atrás'
            variant='outline'
          />
          <Button
            text='Continuar'
            type='submit'
          />
        </Box>
      </form>
    </FormTemplate>
  )
}

export default HotelView