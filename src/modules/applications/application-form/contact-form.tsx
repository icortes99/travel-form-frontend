import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { LeadSource, ContactPreference } from '../../../shared/generated/graphql-schema'
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

interface ContactViewProps {
  lsKey: string
}

const ContactView: FC<ContactViewProps> = ({ lsKey }: ContactViewProps) => {
  const router = useRouter()
  const agency = 'FantasticTravel'
  const { t, enumT } = useTranslation()
  const countryCodes = ['CR', 'PA', 'ES']

  const schema = yup.object().shape({
    email: yup.string().email(t('error.invalidEmail')).required(t('error.required')),
    countryCode: yup.string().oneOf(countryCodes),
    phone: yup.number().required(t('error.required')),
    contactPreference: yup.string().oneOf(Object.values(ContactPreference)),
    leadSource: yup.string().oneOf(Object.values(LeadSource))
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
      console.log('contact view: ', values)
      window.localStorage.setItem(lsKey, JSON.stringify(values))
      router.push(`/application?step=3&agency=fantasticTravel`)
    }
  })

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
            <Box
              marginBottom={'1.5rem'}
            >
              <FormLabel>{t('applicationForm.contact.questions.email')}:</FormLabel>
              <Input
                name='email'
                placeholder='no-email@gmail.com'
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Box>
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
                  options={['CR', 'PA', 'ES']}
                  value={formik.values.countryCode}
                  onChange={formik.handleChange}
                />
                <Input
                  name='phone'
                  placeholder='8888 9999'
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
              </Box>
            </Box>
            <Box
              marginBottom={'1.5rem'}
            >
              <FormLabel>{t('applicationForm.contact.questions.contactPreference')}:</FormLabel>
              <InputDropdown
                name='contactPreference'
                placeholder='Método de contacto'
                options={enumT('enums.contactPreference')}
                value={formik.values.contactPreference}
                onChange={formik.handleChange}
              />
            </Box>
            <Box
              marginBottom={'1.5rem'}
            >
              <FormLabel>{t('applicationForm.contact.questions.leadSource')}:</FormLabel>
              <InputDropdown
                name='leadSource'
                placeholder='WhatsApp'
                options={enumT('enums.leadSource')}
                value={formik.values.leadSource}
                onChange={formik.handleChange}
              />
            </Box>
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