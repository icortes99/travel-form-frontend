import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import FormTemplate from './form-template'
import Input from '../../../shared/components/input'
import InputDropdown from '../../../shared/components/input-dropdown'
import {
  FormControl,
  FormLabel,
  Box,
  Image,
} from '@chakra-ui/react'
import Button from '../../../shared/components/button'

interface ContactViewProps {
  calendlyLink: string
  travelAgencyId: number
}

const ContactView: FC<ContactViewProps> = ({ calendlyLink, travelAgencyId }: ContactViewProps) => {
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: '',
      countryCode: '',
      phone: '',
      contactPreference: '',
      leadSource: ''
    },
    onSubmit: values => {
      console.log('contact view: ', values)
      router.push('/application?step=3&agency=fantasticTravel')
    }
  })

  //eliminar
  const contactPref = [
    'Video llamada',
    'Mensaje',
    'Zoom'
  ]

  //eliminar
  const leadSource = [
    'Instagram',
    'Facebook',
    'Un/a amigo/a'
  ]

  //eliminar
  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = {
      email: '',
      countryCode: '',
      phone: '',
      contactPreference: '',
      leadSource: ''
    }

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formData[key] = e.target.elements[key].value
      }
    }

    console.log('last form: ', formData)
  }

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
                options={contactPref}
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
                options={leadSource}
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
                onClick={() => router.push('/lodging')}
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