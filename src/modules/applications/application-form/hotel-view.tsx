import { FC } from 'react'
import { useRouter } from 'next/navigation'
import FormTemplate from './form-template'
import InputDropdown from '../../../shared/components/input-dropdown'
import Passenger from '../../../shared/components/passenger'
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Image,
  Text
} from '@chakra-ui/react'
import Button from '../../../shared/components/button'

interface HotelViewProps {
  travelAgencyId?: number
  passengers: number
}

const HotelView: FC<HotelViewProps> = ({ travelAgencyId, passengers }: HotelViewProps) => {
  const router = useRouter()
  const habitaciones = []
  for (let i = 1; i <= passengers; i++) {
    habitaciones.push(i)
  }

  const selectedRooms = 1 //debe tomar el valor de input 'rooms'

  //eliminar, informacion quemada
  const hotels = ['Disney', 'Universal', 'Other']

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = {
      hotel: '',
      rooms: '',
    }

    //inicializar todos los campos del objeto
    /*for (let i = 0; i < passengers; i++) {
      formData[`namePassenger${i}`] = ''
      formData[`lastNamePassenger${i}`] = ''
      formData[`birthPassenger${i}`] = ''
      formData[`roomPassenger${i}`] = ''
    }*/

    //con los campos ya creados, se recura la informacion
    /*for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formData[key] = e.target.elements[key].value
      }
    }*/

    console.log('form data: ', e)

    router.push('/contact')
  }

  return (
    <FormTemplate
      title='Hospedaje'
      description='Comenzaremos con el destino que deseas visitar, te brindamos toda la información necesaria para que tomes la mejor decisión.'
      step={2}
    >
      <form
        onSubmit={handleSubmit}
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
                />
              </Box>
              <Box>
                <FormLabel>Número de habitaciones:</FormLabel>
                <InputDropdown
                  options={habitaciones}
                  name='rooms'
                  placeholder='Las habitaciones que gustes'
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
            height={'5rem'}
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
                      <Passenger
                        key={i}
                        passengerId={i + 1}
                        rooms={habitaciones.length}
                      />
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
            onClick={() => router.push('/information')}
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