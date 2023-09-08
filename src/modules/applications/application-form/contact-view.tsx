import { FC } from 'react'
import FormTemplate from './form-template'
import InputString from '../../../shared/components/input'
import InputDropdown from '../../../shared/components/input-dropdown'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Image,
} from '@chakra-ui/react'
import Button from '../../../shared/components/button'

interface ContactViewProps {
  calendlyLink: string
  travelAgencyId: number
}

const ContactView: FC<ContactViewProps> = ({ calendlyLink, travelAgencyId }: ContactViewProps) => {
  const contactPref = [
    'Video llamada',
    'Mensaje',
    'Zoom'
  ]

  const leadSource = [
    'Instagram',
    'Facebook',
    'Un/a amigo/a'
  ]

  return (
    <FormTemplate
      title='Contacto'
      description='En este último paso, recopilamos la información para contactarte, como te gustaría ser contactado y agendaremos una reunión online.'
      step={3}
    >
      <Box
        width={'100%'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
      >
        <FormControl
          width={'85%'}
        >
          <Box
            marginBottom={'1.5rem'}
          >
            <FormLabel>Correo:</FormLabel>
            <InputString
              name='email'
              placeholder='Tu correo aquí'
            />
          </Box>
          <Box
            marginBottom={'1.5rem'}
          >
            <FormLabel>Teléfono:</FormLabel>
            <Box
              display={'flex'}
            >
              <InputDropdown
                name='countryCode'
                placeholder=''
                options={['CR', 'PA', 'ES']}
              />
              <InputString
                name='phone'
                placeholder='Teléfono'
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
            />
          </Box>
          <Box
            marginBottom={'1.5rem'}
          >
            <FormLabel>¿Cómo diste con nosotros?:</FormLabel>
            <InputDropdown
              name='contactPreference'
              placeholder='Método de contacto'
              options={leadSource}
            />
          </Box>
          <Box
            display={'flex'}
            width={'100%'}
          >
            <Image
              width={'60%'}
              alt='travel agency logo'
              src='https://res.cloudinary.com/dhe2iy0sa/image/upload/v1694205363/logoFantasticTravel_uevtay.png'
            />
            <Box
              display={'flex'}
              flexDirection={'column'}
              height={'auto'}
              padding={'1rem'}
              justifyContent={'space-evenly'}
            >
              <Button
                onClick={() => console.log('atras')}
                text='Atrás'
                variant='outline'
              />
              <Button
                onClick={() => console.log('continuar')}
                text='Finalizar'
                type='submit'
              />
            </Box>
          </Box>
        </FormControl>
      </Box>
    </FormTemplate>
  )
}

export default ContactView