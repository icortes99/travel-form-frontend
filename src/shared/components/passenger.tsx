import { FC } from 'react'
import InputString from './input'
import InputDate from './input-date'
import InputDropdown from './input-dropdown'
import { Box, FormLabel, Heading } from '@chakra-ui/react'

interface PassengerProps {
  passengerId: number
  rooms: number
}

const Passenger: FC<PassengerProps> = ({ passengerId, rooms }: PassengerProps) => {
  const optionRooms = []
  for (let i = 1; i <= rooms; i++) {
    optionRooms.push(i)
  }

  return (
    <Box
      marginBottom={'1.5rem'}
    >
      <Heading
        as={'h3'}
        fontWeight={500}
        fontSize={'1.5rem'}
        margin={'0'}
      >
        Pasajero {passengerId}
      </Heading>
      <Box
        display={{ sm: 'block', lg: 'grid' }}
        gridTemplateColumns={'repeat(3, 1fr) 15%'}
        gridGap={'1.5rem'}
      >
        <Box>
          <FormLabel
            marginTop={'1rem'}
          >
            Nombre:
          </FormLabel>
          <InputString
            name={`namePassenger${passengerId}`}
            placeholder={`Nombre del pasajero ${passengerId}`}
          />
        </Box>
        <Box>
          <FormLabel
            marginTop={'1rem'}
          >
            Apellido:
          </FormLabel>
          <InputString
            name={`lastNamePassenger${passengerId}`}
            placeholder={`Apellido del pasajero ${passengerId}`}
          />
        </Box>
        <Box>
          <FormLabel
            marginTop={'1rem'}
          >
            Fecha de nacimiento:
          </FormLabel>
          <InputDate
            name={`birthPassenger${passengerId}`}
            placeholder={`Edad del pasajero ${passengerId}`}
          />
        </Box>
        <Box
          width={{ sm: '100%', lg: '100%' }}
        >
          <FormLabel
            marginTop={'1rem'}
          >
            Habitacion:
          </FormLabel>
          <InputDropdown
            name={`roomPassenger${passengerId}`}
            placeholder={`Habitación del pasajero ${passengerId}`}
            options={optionRooms}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Passenger