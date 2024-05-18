import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  LeadSource,
  ContactPreference,
  useCreateApplicationMutation,
  TripObjective,
  ApplicationAttractionCreateWithoutApplicationInput,
  PassengersCreateWithoutApplicationInput
} from '../../../shared/generated/graphql-schema'
import FormTemplate from './form-template'
import InputFlag from '../../../shared/components/input-flags.component'
import {
  FormControl,
  FormLabel,
  Box,
  Image,
} from '@chakra-ui/react'
import Button from '../../../shared/components/button.component'
import { useTranslation } from '../../../shared/hooks'
import Field from '../../../shared/components/field.component'
import FieldDropdown from '../../../shared/components/field-dropdown.component'
import Loading from '../../../shared/components/loading.component'
import { ContactLocalStorage } from '../../../shared/types/localStorage'

interface ContactViewProps {
  lsKey: string
  allLSkeys: string[]
}

const ContactView: FC<ContactViewProps> = ({ lsKey, allLSkeys }: ContactViewProps) => {
  const router = useRouter()
  const agency = 'fantastic-travel'
  const { t } = useTranslation()
  const [createApplication] = useCreateApplicationMutation()
  const [loading, setLoading] = useState<{ loading: boolean, result: string }>({
    loading: false,
    result: ''
  })
  const areCompanions: boolean = JSON.parse(window.localStorage.getItem(allLSkeys[1]))?.companions === 'true' || false

  const schema = yup.object().shape({
    email: yup.string().email(t('error.invalidEmail')).required(t('error.required')),
    phone: yup.string().required(t('error.required')),
    contactPreference: yup.string().oneOf(Object.keys(ContactPreference)).required(t('error.required')),
    leadSource: yup.string().oneOf(Object.keys(LeadSource)).required(t('error.required'))
  })

  const initialValues: ContactLocalStorage = JSON.parse(localStorage.getItem(lsKey)) || {
    email: '',
    phone: '',
    contactPreference: '',
    leadSource: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: values => {
      window.localStorage.setItem(lsKey, JSON.stringify(values))
      submitApplication(values)
    }
  })

  const handlePhoneChange = (phone: string) => {
    formik.setFieldValue('phone', phone)
  }

  const submitApplication = (contactValues) => {
    setLoading((prev) => ({
      ...prev,
      loading: true
    }))

    const destiny = JSON.parse(window.localStorage.getItem(allLSkeys[0]))
    const tripInfo = JSON.parse(window.localStorage.getItem(allLSkeys[1]))
    const itinerary = JSON.parse(window.localStorage.getItem(allLSkeys[2]))
    const companions = JSON.parse(window.localStorage.getItem(allLSkeys[3]))

    const attractions: ApplicationAttractionCreateWithoutApplicationInput[] = destiny?.attractions?.map((uuid: string, i: number) => ({
      attraction: {
        connect: {
          uuid: uuid
        } 
      },
      startDate: itinerary?.attractionsDetails[i]?.start,
      endDate: itinerary?.attractionsDetails[i]?.finish,
      ...(tripInfo?.lodging === 'true' && {
        hotel: {
          connect: {
            uuid: itinerary?.attractionsDetails[i]?.hotelType
          }
        },
        selectedRoomType: itinerary?.attractionsDetails[i]?.roomType
      })
    }))

    const passengers: PassengersCreateWithoutApplicationInput[] = companions.passengersData.map(passenger => ({
      person: {
        create: {
          firstName: passenger.name,
          lastName: passenger.lastName,
          age: parseInt(passenger.age)
        }
      },
      roomAssigned: parseInt(passenger.room)
    }))

    createApplication({
      variables: {
        data: {
          //Destination and attractions
          destination: { connect: { uuid: destiny.destination } },
          applicationAttractions: {
            create: attractions
          },

          //Enums
          tripObjective: TripObjective[tripInfo.tripObjective],
          contactPreference: ContactPreference[contactValues.contactPreference],
          leadSource: LeadSource[contactValues.leadSource],

          //Pepole involved
          userCurrentLocation: tripInfo.country,
          user: {
            create: {
              email: contactValues.email,
              password: "",
              photo: "",
              phoneNumber: contactValues.phone,
              person: {
                create: {
                  firstName: tripInfo.name,
                  lastName: tripInfo.lastname,
                  age: parseInt(tripInfo.age)
                }
              }
            }
          },
          hasEntryPermission: tripInfo.entryPermission === 'true' ? true : false,
          passengers: tripInfo.companions === 'true' ? {
            create: passengers
          } : null,

          //Time
          startDate: tripInfo.startDate,
          endDate: tripInfo.exitDate,

          //Agency
          travelAgency: {
            connect: {
              slug: agency
            }
          }
        }
      }
    })
      .then(() => {
        setLoading((prev) => ({
          ...prev,
          result: 'success'
        }))
        router.push('/')
      })
      .catch(() => {})
      .finally(() => setLoading((prev) => ({
        ...prev,
        loading: false
      })))
  }

  const handleBack = () => {
    if (areCompanions){
      router.push(`/application/${agency}?step=4`)
    } else {
      router.push(`/application/${agency}?step=3`)
    }
  }

  return (
    <>
    <FormTemplate
      title={'applicationForm.contact.title'}
      description={'applicationForm.contact.description'}
      step={4}
      pageTitle={'applicationForm.contact.stepName'}
      agencyName={agency}
    >
      <form
        onSubmit={formik.handleSubmit}
      >
        <Box
          width={'100%'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
        >
          <FormControl
            display={{ sm: 'block', lg: 'grid' }}
            gridTemplateColumns={'repeat(2, 1fr)'}
            gridTemplateRows={'repeat(2, 1fr)'}
            gap={'1.5rem'}
          >
            <Field
              label={'applicationForm.contact.questions.email'}
              input={{
                name: 'email',
                placeholder: 'no-mail@gmail.com',
                value: formik.values.email,
                onChange: formik.handleChange,
                isOk: !(formik.touched.email && !!formik.errors.email),
                onBlur: formik.handleBlur
              }}
              error={formik.touched.email && formik.errors.email && formik.errors.email.toString()}
              styles={{ marginBottom: '1.5rem' }}
            />
            <Box
              marginBottom={'1.5rem'}
            >
              <FormLabel>{t('applicationForm.contact.questions.phone')}:</FormLabel>
              <Box>
                <InputFlag
                  name={'phone'}
                  onChange={handlePhoneChange}
                  value={formik.values.phone}
                  isOk={!(formik.touched.phone && !!formik.errors.phone)}
                  onBlur={formik.handleBlur}
                />
              </Box>
            </Box>
            <FieldDropdown
              label={'applicationForm.contact.questions.contactPreference'}
              input={{
                name: 'contactPreference',
                options: 'enums.contactPreference',
                placeholder: 'Whatsapp',
                value: formik.values.contactPreference,
                onChange: formik.handleChange,
                isOk: !(formik.touched.contactPreference && !!formik.errors.contactPreference),
                onBlur: formik.handleBlur
              }}
              error={formik.touched.contactPreference && formik.errors.contactPreference && formik.errors.contactPreference.toString()}
              styles={{ marginBottom: '1.5rem' }}
            />
            <FieldDropdown
              label={'applicationForm.contact.questions.leadSource'}
              input={{
                name: 'leadSource',
                options: 'enums.leadSource',
                placeholder: 'Instagram',
                value: formik.values.leadSource,
                onChange: formik.handleChange,
                isOk: !(formik.touched.leadSource && !!formik.errors.leadSource),
                onBlur: formik.handleBlur
              }}
              error={formik.touched.leadSource && formik.errors.leadSource && formik.errors.leadSource.toString()}
              styles={{ marginBottom: '1.5rem' }}
            />
          </FormControl>
          <Box
            display={'flex'}
            width={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Image
              width={'60%'}
              maxWidth={'16rem'}
              aspectRatio={'1'}
              alt='travel agency logo'
              src='https://res.cloudinary.com/dhe2iy0sa/image/upload/v1694205363/logoFantasticTravel_uevtay.png'
            />
            <Box
              display={'flex'}
              flexDirection={'column'}
              height={'100%'}
              minHeight={'10rem'}
              padding={'1rem'}
              justifyContent={'space-evenly'}
            >
              <Button
                onClick={handleBack}
                text={t('buttons.back')}
                variant='outline'
              />
              <Button
                onClick={() => { }}
                text={t('buttons.submit')}
                type='submit'
              />
            </Box>
          </Box>
        </Box>
      </form>
    </FormTemplate>
    {
      loading.loading && <Loading area='blur' />
    }
    </>
  )
}

export default ContactView