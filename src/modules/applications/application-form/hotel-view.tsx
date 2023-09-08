import { FC } from 'react'
import FormTemplate from './form-template'
import InputDate from '../../../shared/components/input-date'
import InputDropdown from '../../../shared/components/input-dropdown'
import InputString from '../../../shared/components/input'
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
  const habitaciones = []
  for (let i = 1; i <= passengers; i++) {
    habitaciones.push(i)
  }

  const selectedRooms = 1 //debe tomar el valor de input 'rooms'

  console.log('habs: ', habitaciones)

  //eliminar, informacion quemada
  const hotels = ['Disney', 'Universal', 'Other']

  return (
    <FormTemplate
      title='Hospedaje'
      description='Comenzaremos con el destino que deseas visitar, te brindamos toda la información necesaria para que tomes la mejor decisión.'
      step={2}
    >
      <Box
        width={'100%'}
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
      >
        <Box
          width={'85%'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
        >
          <Box
            width={'100%'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
          > {/* COLUMNA 1 */}
            <Image
              width={'25rem'}
              height={'25rem'}
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
            margin={'1.5rem 0 1.5rem'}
          />
          <Box> {/* COLUMNA 2 */}
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
      </Box>
      <Box
        display={'flex'}
        width={'100%'}
        justifyContent={'space-evenly'}
        margin={'.5rem 0 2rem'}
      >
        <Button
          onClick={() => console.log('atras')}
          text='Atrás'
          variant='outline'
        />
        <Button
          onClick={() => console.log('continuar')}
          text='Continuar'
          type='submit'
        />
      </Box>
    </FormTemplate>
  )
}

export default HotelView