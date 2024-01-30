import { FC } from 'react'
import { Box, Divider, Text } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import FormTemplate from './form-template'
import Passenger from '../../../shared/components/passenger.component'
import { useTranslation } from '../../../shared/hooks'
import Button from '../../../shared/components/button.component'

interface PassengersViewProps {
  lsKey: string
  passengersKey: string
}

const PassengersView: FC<PassengersViewProps> = ({ lsKey, passengersKey }: PassengersViewProps) => {
  const agency = 'FantasticTravel'
  const passengersCant: number = JSON.parse(window.localStorage.getItem(passengersKey))?.cantityCompanions || 2
  const router = useRouter()
  const { t } = useTranslation()
  const habitaciones = []
  for (let i = 0; i <= passengersCant; i++) {
    habitaciones.push(i + 1)
  }

  const passengerSchema = yup.object().shape({
    name: yup.string().min(3, t('error.tooShort')).required(t('error.required')),
    lastName: yup.string().min(3, t('error.tooShort')).required(t('error.required')),
    birth: yup.date().max(new Date(), t('error.invalidDate')).required(t('error.required')),
    room: yup.string().required(t('error.required'))
  })

  const schema = yup.object().shape({
    passengersData: yup.array().of(passengerSchema)
  })

  const initialValues = JSON.parse(localStorage.getItem(lsKey)) || {
    passengersData: Array.from({ length: passengersCant }, () => ({ name: '', lastName: '', birth: '', room: 1 }))
  }

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: values => {
      window.localStorage.setItem(lsKey, JSON.stringify(values))
      router.push(`/application/${agency}?step=5`)
    }
  })

  const handlePassengerChange = (passengerIndex: number, input: string, value: any) => {
    const updatedPassengersData = [...formik.values.passengersData]
    const updatedPassenger = { ...updatedPassengersData[passengerIndex] }
    updatedPassenger[input] = value
    updatedPassengersData[passengerIndex] = updatedPassenger
    formik.setFieldValue('passengersData', updatedPassengersData)
  }

  const handlePassengerBlur = (field: string, passengerIndex: number) => {
    const updatedTouched = { ...formik.touched }
    const passengersDataTouched = updatedTouched.passengersData || []
    passengersDataTouched[passengerIndex] = { ...passengersDataTouched[passengerIndex], [field]: true }
    updatedTouched.passengersData = passengersDataTouched
    formik.setTouched(updatedTouched)
  }

  return (
    <FormTemplate
      title={'applicationForm.passengers.title'}
      description={'applicationForm.passengers.description'}
      step={3}
      pageTitle={'applicationForm.passengers.stepName'}
      agencyName={agency}
    >
      <Text marginBottom={'1.5rem'}>
        {t('applicationForm.itinerary.questions.message')}
      </Text>
      <form>
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
                      rooms={passengersCant}
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
        <Box
          display={'flex'}
          width={'100%'}
          justifyContent={{ sm: 'space-evenly', lg: 'flex-end' }}
          gap={{ sm: '0', lg: '1.5rem' }}
          margin={{ sm: '.5rem 0 2rem', lg: '1.5rem 0 2rem' }}
        >
          <Button
            onClick={() => router.push(`/application/${agency}?step=3`)}
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

export default PassengersView