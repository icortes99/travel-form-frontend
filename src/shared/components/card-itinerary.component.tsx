import { FC } from 'react'
import { Box, Card, CardBody, Heading, Image, Stack } from '@chakra-ui/react'
import FieldDate from './field-date.component'
import FieldDropdown from './field-dropdown.component'

interface CardItineraryProps {
  cardId: number
  image: string
  title: string
  values: { start: string, finish: string, hotelType: string, roomType: string }
  hotelAssistance: boolean
  onChange: (cardIndex: number, input: string, value: string) => void
  isOk: { start: boolean, finish: boolean, hotelType: boolean, roomType: boolean }
  errors?: { start?: string, finish?: string, hotelType?: string, roomType?: string }
  onBlur?: (e: any) => void
}

const CardItinerary: FC<CardItineraryProps> = ({
  cardId,
  image,
  title,
  values,
  hotelAssistance,
  onChange,
  isOk,
  errors,
  onBlur
}: CardItineraryProps) => {
  const handleChange = (field: string, value: string) => {
    onChange(cardId, field, value)
  }

  return (
    <Card
      direction={{ base: 'column', sm: 'column', md: 'column', lg: 'row' }}
      overflow={'hidden'}
      variant={'unstyled'}
    >
      <Image
        objectFit='cover'
        width={{ sm: '17rem', md: '17rem', lg: '12rem' }}
        height={{ sm: '17rem', md: '17rem', lg: '12rem' }}
        src={image}
        alt={'Attraction image'}
        borderRadius={'.5rem'}
        alignSelf={{ sm: 'center', md: 'center', lg: 'start' }}
        marginBottom={{ sm: '1rem', md: '1rem', lg: '0' }}
        marginRight={{ sm: '0', md: '0', lg: '1.5rem' }}
      />
      <Stack
        alignSelf={{ lg: 'center' }}
      >
        <CardBody>
          <Heading
            fontSize={'2xl'}
            marginBottom={'1.5rem'}
            color={`white.text`}
          >
            {title}
          </Heading>

          <Box
            display={'grid'}
            gridTemplateColumns={{ sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gridTemplateRows={{ sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(1, 1fr)' }}
            gridGap={'1.5rem'}
          >
            <FieldDate
              label={'applicationForm.itinerary.questions.attractionStart'}
              input={{
                name: 'start',
                value: values.start,
                placeholder: 'mm/dd/yy',
                onChange: (e) => handleChange('start', e.target.value),
                isOk: !(isOk?.start && errors?.start),
                onBlur: () => onBlur('start')
              }}
              error={(isOk?.start) && errors?.start}
            />
            <FieldDate
              label={'applicationForm.itinerary.questions.attractionEnd'}
              input={{
                name: 'finish',
                value: values.finish,
                placeholder: 'mm/dd/yy',
                onChange: (e) => handleChange('finish', e.target.value),
                isOk: !(isOk?.finish && errors?.finish),
                onBlur: () => onBlur('finish')
              }}
              error={(isOk?.finish) && errors?.finish}
            />
            <FieldDropdown
              label={'applicationForm.itinerary.questions.hotelType'}
              input={{
                name: 'hotelType',
                options: ['Test'],
                value: values.hotelType,
                placeholder: 'Deluxe',
                onChange: (e) => handleChange('hotelType', e.target.value),
                isOk: !(isOk?.hotelType && errors?.hotelType),
                onBlur: () => onBlur('hotelType')
              }}
              error={(isOk?.hotelType) && errors?.hotelType}
            />
            <FieldDropdown
              label={'applicationForm.itinerary.questions.roomType'}
              input={{
                name: 'roomType',
                options: ['Test'],
                value: values.roomType,
                placeholder: 'Deluxe',
                onChange: (e) => handleChange('roomType', e.target.value),
                isOk: !(isOk?.roomType && errors?.roomType),
                onBlur: () => onBlur('roomType')
              }}
              error={(isOk?.roomType) && errors?.roomType}
            />
          </Box>
        </CardBody>
      </Stack>
    </Card>
  )
}

export default CardItinerary