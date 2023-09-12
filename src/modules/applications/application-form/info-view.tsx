import { FC } from 'react'
import { useRouter } from 'next/navigation'
import FormTemplate from './form-template'
import InputString from '../../../shared/components/input'
import InputDate from '../../../shared/components/input-date'
import InputDropdown from '../../../shared/components/input-dropdown'
import InputRadioOptions from '../../../shared/components/input-radio-options'
import {
  FormControl,
  FormLabel,
  Box,
  Divider,
  Text
} from '@chakra-ui/react'
import Button from '../../../shared/components/button'

interface InfoViewProps {
  travelAcencyId?: number
}

const InfoView: FC<InfoViewProps> = ({ travelAcencyId }: InfoViewProps) => {
  const router = useRouter()
  const objetivos = [
    'Vacaciones',
    'Viaje en pareja',
    'Viaje familiar'
  ]

  const cantidad = []
  for (let i = 1; i <= 40; i++) {
    cantidad.push(i.toString())
  }

  const handleForm = (e) => {
    e.preventDefault()
    //gather information
    const formData = {
      name: '',
      lastname: '',
      birth: '',
      startDate: '',
      exitDate: '',
      country: '',
      tripObjective: '',
      companions: '',
      cantityCompanions: '',
      entryPermission: 'target.value'
    }

    console.log('form e: ', e)
    //save it

    router.push('/lodging')
  }

  return (
    <FormTemplate
      title='Acerca del viaje'
      description='Ahora, es necesario un poco más de información acerca de ti y sobre el viaje para calcular un estimado y otros trámites pertinentes.'
      step={1}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        width={'100%'}
      >
        <form
          onSubmit={handleForm}
        >
          <FormControl
            display={'flex'}
            width={'100%'}
            flexDirection={{ sm: 'column', lg: 'row' }}
          >
            <Box
              width={{ sm: '100%', lg: 'calc(100% / 4)' }}
            > { /* COLUMNA 1 */}
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>Nombre:</FormLabel>
                <InputString name='name' placeholder='Tu nombre' />
              </Box>
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>Apellido:</FormLabel>
                <InputString name='lastname' placeholder='Tu apellido' />
              </Box>
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>Fecha de nacimiento:</FormLabel>
                <InputDate name='birth' placeholder='mm/dd/aaaa' />
              </Box>
            </Box>
            <Divider
              margin={'.5rem 0 1.5rem 0'}
              display={{ sm: 'block', lg: 'none' }}
              border={'.01rem solid rgba(128, 128, 128, 0.5)'}
            />
            <Divider
              margin={'0 1.5rem'}
              display={{ sm: 'none', lg: 'block' }}
              orientation='vertical'
              height={'auto'}
              border={'.01rem solid rgba(128, 128, 128, 0.5)'}
            />
            <Box
              width={{ sm: '100%', lg: 'calc(100% / 2)' }}
              display={{ sm: 'block', lg: 'grid' }}
              gridTemplateColumns={'repeat(2, 1fr)'}
              gridGap={'1.5rem'}
            > { /* COLUMNA 2 */}
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>Fecha de entrada:</FormLabel>
                <InputDate name='startDate' placeholder='mm/dd/aaaa' />
              </Box>
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>Fecha de salida:</FormLabel>
                <InputDate name='exitDate' placeholder='mm/dd/aaaa' />
              </Box>
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>País de residencia:</FormLabel>
                <InputString
                  name='country'
                  placeholder='País donde vives'
                />
              </Box>
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>Objetivo del viaje:</FormLabel>
                <InputDropdown
                  name='tripObjective'
                  placeholder='Por qué quieres viajar'
                  options={objetivos}
                />
              </Box>
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel marginBottom={'1rem'}>¿Viajas con acompañantes?</FormLabel>
                <InputRadioOptions
                  name='companions'
                />
              </Box>
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>Número de acompañantes:</FormLabel>
                <InputDropdown
                  name='cantityCompanions'
                  placeholder='1...30'
                  options={cantidad}
                />
              </Box>
            </Box>
            <Divider
              margin={'.5rem 0 1.5rem 0'}
              display={{ sm: 'block', lg: 'none' }}
              border={'.01rem solid rgba(128, 128, 128, 0.5)'}
            />
            <Divider
              margin={'0 1.5rem'}
              display={{ sm: 'none', lg: 'block' }}
              orientation='vertical'
              height={'auto'}
              border={'.01rem solid rgba(128, 128, 128, 0.5)'}
            />
            <Box
              width={{ sm: '100%', lg: 'calc(100% / 4)' }}
            > { /* COLUMNA 3 */}
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel marginBottom={'1rem'}>¿Tienes permiso de entrada al país?</FormLabel>
                <InputRadioOptions
                  name='entryPermission'
                />
              </Box>
              <Text>
                La información es relevante para saber si necesitas algún proceso previo para el viaje tal como la solicitud de la visa. Además, así podremos saber si planeas tus vacaciones en temporada de más alta demanda.
              </Text>
            </Box>
          </FormControl>
          <Box
            display={'flex'}
            width={'100%'}
            justifyContent={'space-evenly'}
            margin={'2rem 0'}
          >
            <Button
              onClick={() => router.push('/')}
              text='Atrás'
              variant='outline'
            />
            <Button
              onClick={() => console.log('continuar')}
              text='Continuar'
              type='submit'
            />
          </Box>
        </form>
      </Box>
    </FormTemplate>
  )
}

export default InfoView