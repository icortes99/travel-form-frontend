import { FC } from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { useTranslation } from '../hooks'
import Field from './field.component'
import FieldDate from './field-date.component'
import FieldDropdown from './field-dropdown.component'

interface PassengerProps {
  passengerId: number
  rooms: number
  value: { name: string, lastName: string, birth: string, room: string }
  onChange: any
}

const Passenger: FC<PassengerProps> = ({ passengerId, rooms, value = { name: '', lastName: '', birth: '', room: '' }, onChange }: PassengerProps) => {
  const optionRooms = []
  const { t } = useTranslation()
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
        {t('applicationForm.lodging.questions.passenger')} {passengerId}
      </Heading>
      <Box
        display={{ sm: 'block', lg: 'grid' }}
        gridTemplateColumns={'repeat(3, 1fr) 15%'}
        gridGap={'1.5rem'}
      >
        <Field
          label={'applicationForm.lodging.questions.name'}
          input={{
            name: 'name',
            placeholder: 'Linda',
            value: value.name,
            onChange: (e) => handleChange('name', e.target.value),
            isOk: true,
            onBlur: () => { }
          }}
          styles={{ marginTop: '1rem' }}
        />
        <Field
          label={'applicationForm.lodging.questions.lastName'}
          input={{
            name: 'lastName',
            placeholder: 'Smith',
            value: value.lastName,
            onChange: (e) => handleChange('lastName', e.target.value),
            isOk: true,
            onBlur: () => { }
          }}
          styles={{ marginTop: '1rem' }}
        />
        <FieldDate
          label={'applicationForm.lodging.questions.birthdate'}
          input={{
            name: 'birth',
            placeholder: 'mm/dd/yyyy',
            value: value.birth,
            onChange: (e) => handleChange('birth', e.target.value),
            isOk: true,
            onBlur: () => { }
          }}
          styles={{ marginTop: '1rem' }}
        />
        <FieldDropdown
          label={'applicationForm.lodging.questions.room'}
          input={{
            options: optionRooms,
            name: 'room',
            placeholder: '1, 2, ...',
            value: value.room,
            onChange: (e) => handleChange('room', e.target.value),
            isOk: true,
            onBlur: () => { }
          }}
          styles={{ marginTop: '1rem' }}
        />
      </Box>
    </Box>
  )
}

export default Passenger