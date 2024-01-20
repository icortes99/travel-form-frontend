import { FC, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as yup from 'yup'
import FormTemplate from './form-template'
import Passenger from '../../../shared/components/passenger.component'
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Image,
  Text
} from '@chakra-ui/react'
import Button from '../../../shared/components/button.component'
import Carousel from '../../../shared/components/carousel.component'
import { useTranslation } from '../../../shared/hooks'
import FieldDropdown from '../../../shared/components/field-dropdown.component'
import { useHotelsInDestinyQuery } from '../../../shared/generated/graphql-schema'
import Loading from '../../../shared/components/loading.component'
import CardItinerary from '../../../shared/components/card-itinerary.component'

interface HotelViewProps {
  lsKey: string
  passengersKey: string
  destinyKey: string
}

const HotelView: FC<HotelViewProps> = ({ lsKey, passengersKey, destinyKey }: HotelViewProps) => {
  const router = useRouter()
  const { t } = useTranslation()
  const isFirstRender = useRef(true)
  const habitaciones = []
  const agency = 'FantasticTravel'
  const roomCantInLS: number = +(JSON.parse(window.localStorage.getItem(lsKey))?.rooms)
  const hotelUUIDInLS: string = JSON.parse(window.localStorage.getItem(lsKey))?.hotel || ''
  const passengersCant: number = JSON.parse(window.localStorage.getItem(passengersKey))?.cantityCompanions || 0
  const destiny: string = JSON.parse(window.localStorage.getItem(destinyKey))?.destination || ''
  const tripStart: string = JSON.parse(window.localStorage.getItem(passengersKey))?.startDate || ''
  const tripFinish: string = JSON.parse(window.localStorage.getItem(passengersKey))?.exitDate || ''
  for (let i = 0; i <= passengersCant; i++) {
    habitaciones.push(i + 1)
  }

  const defaultHotel = {
    images: ['https://mickeyvisit.com/wp-content/uploads/2020/01/top-off-site-walt-disney-world-hotels.jpg'],
    name: 'Default Hotel',
    uuid: '',
    suites: []
  }

  const [hotelSelected, setHotelSelected] = useState(defaultHotel)
  const [roomsSelected, setRoomsSelected] = useState<number>(roomCantInLS ?? 1)

  const hotelsInDestinyResponse = useHotelsInDestinyQuery({
    variables: {
      where: {
        destination: {
          uuid: destiny
        },
        travelAgency: {
          slug: agency
        }
      }
    }
  })

  const generateRoomTypes = (numRooms: number, typeRoom?: string) => {
    return Array.from({ length: numRooms }, (_, i) => ({ roomNumber: i + 1, type: typeRoom || '' }))
  }

  const generateAttractionValues = (numAtts: number) => {
    return Array.from({ length: numAtts }, (_, i) => ({ start: '', finish: '', hotelType: '', roomType: '' }))
  }

  useEffect(() => {
    const selectedHotel = hotelsInDestinyResponse?.data?.hotelsInDestinationAgency?.find(i => i.hotel.uuid === hotelUUIDInLS)?.hotel || null
    if (selectedHotel) {
      setHotelSelected(prev => ({ ...prev, images: selectedHotel.images, name: selectedHotel.name, uuid: selectedHotel.uuid, suites: selectedHotel.suites }))
    }
  }, [hotelsInDestinyResponse])

  useEffect(() => {
    if (!isFirstRender.current)
      formik.setFieldValue('roomTypes', generateRoomTypes(roomsSelected))
    else
      isFirstRender.current = false
  }, [roomsSelected])

  function attractionsOverlap(attractions) {
    for (let i = 0; i < attractions.length; i++) {
      for (let j = i + 1; j < attractions.length; j++) {
        const attraction1 = attractions[i]
        const attraction2 = attractions[j]

        const start1 = new Date(attraction1.start)
        const end1 = new Date(attraction1.finish)
        const start2 = new Date(attraction2.start)
        const end2 = new Date(attraction2.finish)

        if (start1 <= end2 && start2 <= end1) {
          return false
        }
      }
    }
    return true
  }

  const passengerSchema = yup.object().shape({
    name: yup.string().min(3, t('error.tooShort')).required(t('error.required')),
    lastName: yup.string().min(3, t('error.tooShort')).required(t('error.required')),
    birth: yup.date().max(new Date(), t('error.invalidDate')).required(t('error.required')),
    room: yup.string().required(t('error.required'))
  })

  const attractionSchema = yup.object().shape({
    start: yup.date().min(tripStart, t('error.invalidDate')).max(tripFinish, t('error.invalidDate')).required(t('error.required')),
    finish: yup.date().min(tripStart, t('error.invalidDate')).max(tripFinish, t('error.invalidDate')).required(t('error.required')),
    hotelType: yup.string().required(t('error.required')),
    roomType: yup.string().required(t('error.required'))
  })

  const roomTypeSchema = yup.object().shape({
    roomNumber: yup.number().required(),
    type: yup.string().required()
  })

  const schema = yup.object().shape({
    hotel: yup.string().required(t('error.required')),
    rooms: yup.number().required(t('error.required')).min(1, t('error.required')),
    passengersData: yup.array().of(passengerSchema),
    roomTypes: yup.array().of(roomTypeSchema),
    attractionsDetails: yup.array().of(attractionSchema).test('datesOverlap', t('error.datesOverlap'), function (attractions) {
      return attractionsOverlap(attractions)
    }
    )
  })

  const initialValues = JSON.parse(localStorage.getItem(lsKey)) || {
    hotel: '',
    rooms: 0,
    passengersData: Array.from({ length: passengersCant }, () => ({ name: '', lastName: '', birth: '', room: 1 })),
    roomTypes: generateRoomTypes(roomsSelected),
    attractionsDetails: generateAttractionValues(1)
  }

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: values => {
      window.localStorage.setItem(lsKey, JSON.stringify(values))
      router.push(`/application/${agency}?step=4`)
    }
  })

  const [selectedRoom, setSelectedRoom] = useState<number>(1)
  const optionRooms = []
  const suitesInHotel = hotelSelected?.suites?.reduce((acc, obj) => ({ ...acc, [obj.uuid]: obj.name }), {})
  for (let i = 1; i <= roomsSelected; i++) {
    optionRooms.push(i.toString())
  }
  const is2ndColumnRendered: boolean = formik.values.hotel !== '' && formik.values.rooms !== 0
  const arePassengersRendered: boolean = !formik.values.roomTypes.some(item => item.type === '')

  const handleRoomsSelection = (value: number) => {
    setRoomsSelected(value)
    formik.handleChange({ target: { name: 'rooms', value: value } })
  }

  const handlePassengerChange = (passengerIndex: number, input: string, value: any) => {
    const updatedPassengersData = [...formik.values.passengersData]
    const updatedPassenger = { ...updatedPassengersData[passengerIndex] }
    updatedPassenger[input] = value
    updatedPassengersData[passengerIndex] = updatedPassenger
    formik.setFieldValue('passengersData', updatedPassengersData)
  }

  const handleItineraryChange = (itineraryIndex: number, input: string, value: any) => {
    const formikData = [...formik.values.attractionsDetails]
    const update = { ...formikData[itineraryIndex] }
    update[input] = value
    formikData[itineraryIndex] = update
    formik.setFieldValue('attractionsDetails', formikData)
  }

  const handleHotelChange = (hotelId: string) => {
    const selectedHotel = hotelsInDestinyResponse?.data?.hotelsInDestinationAgency?.find(i => i.hotel.uuid === hotelId).hotel || {}
    setHotelSelected(prev => ({ ...prev, images: selectedHotel.images, name: selectedHotel.name, uuid: selectedHotel.uuid, suites: selectedHotel.suites }))
    formik.setFieldValue('hotel', selectedHotel.uuid)
  }

  const getHotels = () => {
    const result: Record<string, string> = {}

    hotelsInDestinyResponse?.data?.hotelsInDestinationAgency?.map(hotel => {
      result[hotel.hotel.uuid] = hotel.hotel.name
    })

    return result
  }

  const handlePassengerBlur = (field: string, passengerIndex: number) => {
    const updatedTouched = { ...formik.touched }
    const passengersDataTouched = updatedTouched.passengersData || []
    passengersDataTouched[passengerIndex] = { ...passengersDataTouched[passengerIndex], [field]: true }
    updatedTouched.passengersData = passengersDataTouched
    formik.setTouched(updatedTouched)
  }

  const handleAttractionBlur = (field: string, attractionIndex: number) => {
    const updatedTouched = { ...formik.touched }
    const attractionTouched = updatedTouched.attractionsDetails || []
    attractionTouched[attractionIndex] = { ...attractionTouched[attractionIndex], [field]: true }
    updatedTouched.attractionsDetails = attractionTouched
    formik.setTouched(updatedTouched)
  }

  const handleRoomChange = (currentRoom: string) => {
    const currentRoomParse: number = +currentRoom
    setSelectedRoom(currentRoomParse)
  }

  const handleTypeChange = (selectedType: string) => {
    const formikRoomTypes = [...formik.values.roomTypes]
    formikRoomTypes[selectedRoom - 1].type = selectedType
    formik.setFieldValue('roomTypes', formikRoomTypes)
  }

  const handleApplyForAll = () => {
    const typeValue = formik.values.roomTypes[selectedRoom - 1].type
    formik.setFieldValue('roomTypes', generateRoomTypes(roomsSelected, typeValue))
  }

  return (
    <FormTemplate
      title={'applicationForm.lodging.title'}
      description={'applicationForm.lodging.description'}
      step={2}
      pageTitle={'applicationForm.lodging.stepName'}
      agencyName={agency}
    >
      <CardItinerary
        title={'Disney'}
        image={'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'}
        values={formik.values.attractionsDetails[0]}
        onChange={handleItineraryChange}
        isOk={(formik.touched?.attractionsDetails || [])[0]}
        errors={(formik.errors?.attractionsDetails || [])[0]}
        onBlur={(field) => handleAttractionBlur(field, 0)}
        cardId={0}
        hotelAssistance={true}
      />
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
            marginBottom={{ sm: !is2ndColumnRendered ? '1.5rem' : '0', md: !is2ndColumnRendered ? '1.5rem' : '0' }}
          > {/* COLUMNA 1 */}
            {
              (!hotelsInDestinyResponse.loading) ? (
                <>
                  <Box
                    maxWidth={{ sm: '25rem', md: '25rem', lg: '100%' }}
                    width={'100%'}
                  >
                    <Carousel images={hotelSelected.images} mask={false} />
                  </Box>
                  <FormControl
                    marginTop={'1.5rem'}
                  >
                    <FieldDropdown
                      label={'applicationForm.lodging.questions.hotel'}
                      input={{
                        options: getHotels(),
                        name: 'hotel',
                        placeholder: defaultHotel.name,
                        value: formik.values.hotel,
                        onChange: handleHotelChange,
                        isOk: !(formik.touched.hotel && !!formik.errors.hotel),
                        onBlur: formik.handleBlur,
                        type: 'callback'
                      }}
                      error={formik.touched.hotel && formik.errors.hotel && formik.errors.hotel.toString()}
                      styles={{ marginBottom: '1.5rem' }}
                    />
                    <FieldDropdown
                      label={'applicationForm.lodging.questions.rooms'}
                      input={{
                        options: passengersCant > 0 ? habitaciones : ['1'],
                        name: 'rooms',
                        placeholder: '1, 2, 3...',
                        value: formik.values.rooms,
                        onChange: (e) => handleRoomsSelection(e.target.value),
                        isOk: !(formik.touched.rooms && !!formik.errors.rooms),
                        onBlur: formik.handleBlur
                      }}
                      error={formik.touched.rooms && formik.errors.rooms && formik.errors.rooms.toString()}
                    />
                  </FormControl>
                </>
              ) : <Loading area='partial' />
            }
          </Box>
          <Divider
            margin={'1.5rem 0'}
            display={{ sm: is2ndColumnRendered ? 'block' : 'none', lg: 'none' }}
            border={'.01rem solid rgba(128, 128, 128, 0.5)'}
          />
          <Divider
            margin={'0 1.5rem'}
            display={{ sm: 'none', lg: is2ndColumnRendered ? 'block' : 'none' }}
            orientation='vertical'
            minHeight={'31rem'}
            border={'.01rem solid rgba(128, 128, 128, 0.5)'}
          />
          <Box
            display={is2ndColumnRendered ? 'block' : 'none'}
            width={{ sm: '100%', lg: '75%' }}
          > {/* COLUMNA 2 */}
            {
              (!hotelsInDestinyResponse.loading) ?
                <Box
                  height={{ sm: 'auto', md: 'auto', lg: arePassengersRendered ? 'auto' : '30rem' }}
                  display={{ sm: 'block', md: 'block', lg: arePassengersRendered ? 'block' : 'flex' }}
                  flexDirection={{ lg: 'column' }}
                  justifyContent={{ lg: arePassengersRendered ? 'start' : 'center' }}
                >{ /* TIPO DE HABITACION */}
                  <Text marginBottom={'1.5rem'}>
                    {t('applicationForm.lodging.questions.roomTypeText')}
                  </Text>
                  <Box
                    display={{ md: 'block', lg: 'grid' }}
                    gridTemplateColumns={'1fr 1fr 1.2fr'}
                    gridGap={'0 1.5rem'}
                    marginBottom={{ sm: !arePassengersRendered ? '1.5rem' : '0', md: !arePassengersRendered ? '1.5rem' : '0' }}
                  >
                    <FieldDropdown
                      label={'applicationForm.lodging.questions.room'}
                      input={{
                        options: optionRooms,
                        name: 'roomType',
                        placeholder: '1, 2, 3...',
                        value: selectedRoom,
                        onChange: (e) => handleRoomChange(e.target.value),
                        isOk: true,
                        onBlur: formik.handleBlur
                      }}
                      styles={{ marginBottom: '1.5rem' }}
                    />
                    <FieldDropdown
                      label={'applicationForm.lodging.questions.selectType'}
                      input={{
                        options: suitesInHotel,
                        name: 'selectType',
                        placeholder: 'Familiar',
                        value: formik.values.roomTypes[selectedRoom - 1]?.type,
                        onChange: (e) => handleTypeChange(e.target.value),
                        isOk: true,
                        onBlur: formik.handleBlur
                      }}
                      styles={{ marginBottom: '1.5rem' }}
                    />
                    <Checkbox
                      size='md'
                      colorScheme='pink'
                      margin={'0 .5rem 0 0'}
                      onChange={() => handleApplyForAll()}
                      spacing={'2.5'}
                    >
                      {t('applicationForm.lodging.questions.applyForAll')}
                    </Checkbox>
                  </Box>
                </Box>
                : <Loading area='partial' />
            }
            <Divider
              display={arePassengersRendered ? 'block' : 'none'}
              margin={{ sm: '1.5rem 0', md: '1.5rem 0', lg: '0 0 1.5rem' }}
              border={'.01rem solid rgba(128, 128, 128, 0.5)'}
            />
            <Box
              display={arePassengersRendered ? 'block' : 'none'}
            >
              <Text marginBottom={'1.5rem'}>
                {t('applicationForm.lodging.questions.message')}
              </Text>
              <Box>
                {
                  (() => {
                    const renderPassengers = []
                    for (let i = 0; i < passengersCant; i++) {
                      renderPassengers.push(
                        <>
                          <Passenger
                            key={i}
                            passengerId={i + 1}
                            rooms={roomsSelected}
                            values={formik.values.passengersData[i]}
                            onChange={handlePassengerChange}
                            isOk={(formik.touched?.passengersData || [])[i]}
                            errors={(formik.errors?.passengersData || [])[i]}
                            onBlur={(field) => handlePassengerBlur(field, i)}
                          />
                          {
                            i < passengersCant - 1 ?
                              <Divider
                                margin={'.5rem 0 1rem 0'}
                                border={'.01rem solid rgba(128, 128, 128, 0.5)'}
                                key={i + 100}
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