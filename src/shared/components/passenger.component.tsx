import { FC } from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { useTranslation } from '../hooks'
import Field from './field.component'
import FieldDropdown from './field-dropdown.component'
import FieldQuantity from './filed-quantity.component'

interface PassengerProps {
  passengerId: number
  rooms: number
  values: { name: string, lastName: string, age: number, room: string }
  onChange: (passengerIndex: number, input: string, value: any) => void
  isOk: { name: boolean, lastName: boolean, age: boolean, room: boolean }
  errors?: { name?: string, lastName?: string, age?: string, room?: string }
  onBlur?: (e: any) => void
}

const Passenger: FC<PassengerProps> = ({ passengerId, rooms, values, onChange, isOk = { name: false, lastName: false, age: false, room: false }, errors, onBlur }: PassengerProps) => {
  const optionRooms = []
  const { t } = useTranslation()
  for (let i = 1; i <= rooms; i++) {
    optionRooms.push(i)
  }

  const handleChange = (field: string, value: string) => {
    const currentPassenger = passengerId - 1
    onChange(currentPassenger, field, value)
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
        {t('applicationForm.passengers.questions.passenger')} {passengerId}
      </Heading>
      <Box
        display={{ sm: 'block', lg: 'grid' }}
        gridTemplateColumns={'repeat(3, 1fr) 15%'}
        gridGap={'1.5rem'}
      >
        <Field
          label={'applicationForm.passengers.questions.name'}
          input={{
            name: 'name',
            placeholder: 'Linda',
            value: values.name,
            onChange: (e) => handleChange('name', e.target.value),
            isOk: !(isOk?.name && errors?.name),
            onBlur: () => onBlur('name')
          }}
          error={(isOk?.name) && errors?.name}
          styles={{ marginTop: '1rem' }}
        />
        <Field
          label={'applicationForm.passengers.questions.lastName'}
          input={{
            name: 'lastName',
            placeholder: 'Smith',
            value: values.lastName,
            onChange: (e) => handleChange('lastName', e.target.value),
            isOk: !(isOk?.lastName && errors?.lastName),
            onBlur: () => onBlur('lastName')
          }}
          error={(isOk?.lastName) && errors?.lastName}
          styles={{ marginTop: '1rem' }}
        />
        <FieldQuantity
          label={'applicationForm.passengers.questions.age'}
          input={{
            name: 'age',
            placeholder: '35',
            value: values.age,
            onChange: (e) => handleChange('age', e.target.value),
            isOk: !(isOk?.age && errors?.age),
            onBlur: () => onBlur('age')
          }}
          error={(isOk?.age) && errors?.age}
          styles={{ marginTop: '1rem' }}
        />
        <FieldDropdown
          label={'applicationForm.passengers.questions.room'}
          input={{
            options: optionRooms,
            name: 'room',
            placeholder: '1, 2, ...',
            value: values.room,
            onChange: (e) => handleChange('room', e.target.value),
            isOk: !(isOk?.room && errors?.room),
            onBlur: () => onBlur('room')
          }}
          error={(isOk?.room) && errors?.room}
          styles={{ marginTop: '1rem' }}
        />
      </Box>
    </Box>
  )
}

export default Passenger