import { FC, useState } from 'react'
import { Box, Card, CardBody, Heading, Image, Stack } from '@chakra-ui/react'
import FieldDate from './field-date.component'
import FieldDropdown from './field-dropdown.component'
import { Suite } from '../generated/graphql-schema'

interface SuiteProps {
  name?: string
  uuid?: string
}

interface HotelProps {
  [uuid: string]: { name: string; suite: SuiteProps[] }
}

interface CardItineraryProps {
  cardId: number
  image: string | string[]
  title: string
  values: { start: string, finish: string, hotelType: string, roomType: string }
  hotelAssistance: boolean
  onChange: (cardIndex: number, input: string, value: string) => void
  isOk: { start: boolean, finish: boolean, hotelType: boolean, roomType: boolean }
  errors?: { start?: string, finish?: string, hotelType?: string, roomType?: string }
  onBlur?: (e: any) => void
  hotelsValues: HotelProps
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
  onBlur,
  hotelsValues
}: CardItineraryProps) => {
  const [selectedHotel, setSelectedHotel] = useState(values?.hotelType !== '' ? values?.hotelType : 'Escoge un hotel')

  const handleChange = (field: string, value: string) => {
    onChange(cardId, field, value)
    if (field === 'hotelType') {
      setSelectedHotel(value)
    }
  }

  function parseHotels(hotelDictionary: HotelProps): Record<string, string> {
    const hotelRecord: Record<string, string> = {}

    Object.keys(hotelDictionary).map((key) => {
      hotelRecord[key] = hotelDictionary[key]?.name
    })

    return hotelRecord
  }

  function parseSuites(suiteObj: Suite[]): Record<string, string> {
    const suiteRecord: Record<string, string> = {}

    if (selectedHotel !== 'Escoge un hotel') {
      suiteObj.map(suite => {
        suiteRecord[suite?.uuid] = suite?.name
      })
    }

    return suiteRecord
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
        src={Array.isArray(image) ? image[0] : image}
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
            marginBottom={'1rem'}
            color={`white.text`}
          >
            {title}
          </Heading>

          <Box
            display={'grid'}
            gridTemplateColumns={{ sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gridTemplateRows={{ sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(1, 1fr)' }}
            gridGap={'0.5rem 1.5rem'}
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
            {
              hotelAssistance &&
              <>
                <FieldDropdown
                  label={'applicationForm.itinerary.questions.hotelType'}
                  input={{
                    name: 'hotelType',
                    options: parseHotels(hotelsValues),
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
                    options: parseSuites(hotelsValues[selectedHotel]?.suite),
                    value: values.roomType,
                    placeholder: 'Escoge un hotel',
                    onChange: (e) => handleChange('roomType', e.target.value),
                    isOk: !(isOk?.roomType && errors?.roomType),
                    onBlur: () => onBlur('roomType')
                  }}
                  error={(isOk?.roomType) && errors?.roomType}
                />
              </>
            }
          </Box>
        </CardBody>
      </Stack>
    </Card>
  )
}

export default CardItinerary