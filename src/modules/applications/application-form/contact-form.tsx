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
import Input from '../../../shared/components/input.component'
import InputDropdown from '../../../shared/components/input-dropdown.component'
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

interface ContactViewProps {
  lsKey: string
  allLSkeys: string[]
}

const ContactView: FC<ContactViewProps> = ({ lsKey, allLSkeys }: ContactViewProps) => {
  const router = useRouter()
  const agency = 'FantasticTravel'
  const { t } = useTranslation()
  const countryCodes = ['CR', 'PA', 'ES']
  const [createApplication] = useCreateApplicationMutation()
  const [loading, setLoading] = useState<boolean>(false)

  const schema = yup.object().shape({
    email: yup.string().email(t('error.invalidEmail')).required(t('error.required')),
    countryCode: yup.string().oneOf(countryCodes),
    phone: yup.number().required(t('error.required')),
    contactPreference: yup.string().oneOf(Object.keys(ContactPreference)),
    leadSource: yup.string().oneOf(Object.keys(LeadSource))
  })

  const initialValues = JSON.parse(localStorage.getItem(lsKey)) || {
    email: '',
    countryCode: '',
    phone: '',
    contactPreference: '',
    leadSource: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: values => {
      window.localStorage.setItem(lsKey, JSON.stringify(values))
      //router.push(`/`)
      submitApplication(values)
    }
  })

  const submitApplication = (contactValues) => {
    setLoading(true)

    const destiny = JSON.parse(window.localStorage.getItem(allLSkeys[0]))
    const tripInfo = JSON.parse(window.localStorage.getItem(allLSkeys[1]))
    const lodging = JSON.parse(window.localStorage.getItem(allLSkeys[2]))

    const attractions: ApplicationAttractionCreateWithoutApplicationInput[] = destiny.attractions.map((attraction: string) => ({
      attraction: { connect: { uuid: attraction } }
    }))

    const getRoomType = (room: string): string => {
      const roomParse: number = +room
      const roomTypes = lodging.roomTypes
      let result = ''
      roomTypes.map((type) => {
        if (type.roomNumber === roomParse) {
          result = type.type
        }
      })
      return result
    }

    const passengers: PassengersCreateWithoutApplicationInput[] = lodging.passengersData.map(passenger => ({
      person: {
        create: {
          birthdate: passenger.birth,
          firstName: passenger.name,
          lastName: passenger.lastName
        }
      },
      suite: {
        connect: {
          uuid: getRoomType(passenger.room)
        }
      }
    }))

    //console.log('attractions to submit: ', attractions)

    createApplication({
      variables: {
        //Destination and attractions
        data: {
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
              phoneNumber: `${contactValues.countryCode} ${contactValues.phone}`,
              person: {
                create: {
                  firstName: tripInfo.name,
                  lastName: tripInfo.lastname,
                  birthdate: tripInfo.birth
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
          },
        }
      }
    })

    //router.push(`/`)
  }

  return (
    <FormTemplate
      title={'applicationForm.contact.title'}
      description={'applicationForm.contact.description'}
      step={3}
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
              <Box
                display={'grid'}
                gridTemplateColumns={'repeat(1, 1fr) 60%'}
                gridGap={'1.5rem'}
              >
                <InputDropdown
                  name='countryCode'
                  placeholder=''
                  options={['CR', 'PA']}
                  value={formik.values.countryCode}
                  onChange={formik.handleChange}
                  isOk={true}
                />
                <Input
                  name='phone'
                  placeholder='8888 9999'
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  isOk={true}
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
                onClick={() => router.push(`/application/${agency}?step=3`)}
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
  )
}

export default ContactView