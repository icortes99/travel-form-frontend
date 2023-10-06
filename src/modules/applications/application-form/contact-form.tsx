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

interface ContactViewProps {
  lsKey: string
}

const ContactView: FC<ContactViewProps> = ({ lsKey }: ContactViewProps) => {
  const router = useRouter()
  const agency = 'FantasticTravel'
  const countryCodes = ['CR', 'PA', 'ES']

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    countryCode: yup.string().oneOf(countryCodes),
    phone: yup.number().required(),
    contactPreference: yup.string().oneOf(Object.values(ContactPreference)),
    leadSource: yup.string().oneOf(Object.values(LeadSource))
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      countryCode: '',
      phone: '',
      contactPreference: '',
      leadSource: ''
    },
    validationSchema: schema,
    onSubmit: values => {
      console.log('contact view: ', values)
      router.push(`/application?step=3&agency=fantasticTravel`)
    }
  })

  return (
    <FormTemplate
      title='Contacto'
      description='En este último paso, recopilamos la información para contactarte, como te gustaría ser contactado y agendaremos una reunión online.'
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
              <FormLabel>Correo:</FormLabel>
              <Input
                name='email'
                placeholder='Tu correo aquí'
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Box>
            <Box
              marginBottom={'1.5rem'}
            >
              <FormLabel>Teléfono:</FormLabel>
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
                  placeholder='Teléfono'
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
              </Box>
            </Box>
            <Box
              marginBottom={'1.5rem'}
            >
              <FormLabel>Preferencia de contacto:</FormLabel>
              <InputDropdown
                name='contactPreference'
                placeholder='Método de contacto'
                options={Object.values(ContactPreference)}
                value={formik.values.contactPreference}
                onChange={formik.handleChange}
              />
            </Box>
            <Box
              marginBottom={'1.5rem'}
            >
              <FormLabel>¿Cómo diste con nosotros?:</FormLabel>
              <InputDropdown
                name='leadSource'
                placeholder='Método de contacto'
                options={Object.values(LeadSource)}
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
                text='Atrás'
                variant='outline'
              />
              <Button
                onClick={() => { }}
                text='Finalizar'
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