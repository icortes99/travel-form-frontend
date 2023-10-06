import { FC } from 'react'
import InputString from './input.component'
import InputDate from './input-date.component'
import InputDropdown from './input-dropdown.component'
import { Box, FormLabel, Heading } from '@chakra-ui/react'

interface PassengerProps {
  passengerId: number
  rooms: number
  value: { name: string, lastName: string, birth: string, room: string }
  onChange: any
}

const Passenger: FC<PassengerProps> = ({ passengerId, rooms, value, onChange }: PassengerProps) => {
  const optionRooms = []
  for (let i = 1; i <= rooms; i++) {
    optionRooms.push(i)
  }

  const handleChange = (field: string, fieldValue: string) => {
    const updatedValue = { ...value, [field]: fieldValue }
    onChange(updatedValue)
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
            name={'name'}
            placeholder={`Nombre del pasajero ${passengerId}`}
            value={value.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </Box>
        <Box>
          <FormLabel
            marginTop={'1rem'}
          >
            Apellido:
          </FormLabel>
          <InputString
            name={'lastName'}
            placeholder={`Apellido del pasajero ${passengerId}`}
            value={value.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
        </Box>
        <Box>
          <FormLabel
            marginTop={'1rem'}
          >
            Fecha de nacimiento:
          </FormLabel>
          <InputDate
            name={'birth'}
            placeholder={`Edad del pasajero ${passengerId}`}
            value={value.birth}
            onChange={(e) => handleChange('birth', e.target.value)}
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
            name={'room'}
            placeholder={`Habitación del pasajero ${passengerId}`}
            options={optionRooms}
            value={value.room}
            onChange={(e) => handleChange('room', e.target.value)}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Passenger