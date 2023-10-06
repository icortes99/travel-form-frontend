import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import FormTemplate from './form-template'
import * as yup from 'yup'
import { TripObjective } from '../../../shared/generated/graphql-schema'
import Input from '../../../shared/components/input.component'
import InputDate from '../../../shared/components/input-date.component'
import InputDropdown from '../../../shared/components/input-dropdown.component'
import InputRadioOptions from '../../../shared/components/input-radio-options.component'
import {
  FormControl,
  FormLabel,
  Box,
  Divider,
  Text
} from '@chakra-ui/react'
import Button from '../../../shared/components/button.component'

interface InfoViewProps {
  lsKey: string
}

const InfoView: FC<InfoViewProps> = ({ lsKey }: InfoViewProps) => {
  const router = useRouter()

  const cantidad = []
  for (let i = 1; i <= 40; i++) {
    cantidad.push(i.toString())
  }

  const schema = yup.object().shape({
    name: yup.string().min(3, 'Debe ser de minimo 3 caracteres').required('Tu nombre es requerido'),
    lastname: yup.string().min(3).required(),
    birth: yup.date().max(new Date()).required(),
    startDate: yup.date().min(new Date()).required(),
    exitDate: yup.date().min(yup.ref('startDate')).required(),
    country: yup.string().min(3).required(),
    tripObjective: yup.string().oneOf(Object.values(TripObjective)).required(),
    companions: yup.string().oneOf(['Si', 'No', 'Yes']).required(),
    cantityCompanions: yup.number().required(),
    entryPermission: yup.string().oneOf(['Si', 'No', 'Yes']).required()
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      birth: '',
      startDate: '',
      exitDate: '',
      country: '',
      tripObjective: '',
      companions: '',
      cantityCompanions: 0,
      entryPermission: ''
    },
    validationSchema: schema,
    onSubmit: values => {
      window.localStorage.setItem(lsKey, JSON.stringify(values))
      router.push('/application/f95a3f7e-6a1f-4326-8718-fa439a3c5306?step=3')
    }
  })

  //eliminar, informacion quemada
  const objetivos = [
    'Vacaciones',
    'Viaje en pareja',
    'Viaje familiar'
  ]

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
          onSubmit={formik.handleSubmit}
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
                <Input
                  name='name'
                  placeholder='Tu nombre'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
              </Box>
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>Apellido:</FormLabel>
                <Input
                  name='lastname'
                  placeholder='Tu apellido'
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                />
              </Box>
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>Fecha de nacimiento:</FormLabel>
                <InputDate
                  name='birth'
                  placeholder='mm/dd/aaaa'
                  value={formik.values.birth}
                  onChange={formik.handleChange}
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
              width={{ sm: '100%', lg: 'calc(100% / 2)' }}
              display={{ sm: 'block', lg: 'grid' }}
              gridTemplateColumns={'repeat(2, 1fr)'}
              gridGap={'1.5rem'}
            > { /* COLUMNA 2 */}
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>Fecha de entrada:</FormLabel>
                <InputDate
                  name='startDate'
                  placeholder='mm/dd/aaaa'
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                />
              </Box>
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>Fecha de salida:</FormLabel>
                <InputDate
                  name='exitDate'
                  placeholder='mm/dd/aaaa'
                  value={formik.values.exitDate}
                  onChange={formik.handleChange}
                />
              </Box>
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>País de residencia:</FormLabel>
                <Input
                  name='country'
                  placeholder='País donde vives'
                  value={formik.values.country}
                  onChange={formik.handleChange}
                />
              </Box>
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>Objetivo del viaje:</FormLabel>
                <InputDropdown
                  name='tripObjective'
                  placeholder='Por qué quieres viajar'
                  options={Object.values(TripObjective)}
                  value={formik.values.tripObjective}
                  onChange={formik.handleChange}
                />
              </Box>
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel marginBottom={'1rem'}>¿Viajas con acompañantes?</FormLabel>
                <InputRadioOptions
                  name='companions'
                  value={formik.values.companions}
                  onChange={(newValue) => formik.setFieldValue('companions', newValue)}
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
                  value={formik.values.cantityCompanions}
                  onChange={formik.handleChange}
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
                  value={formik.values.entryPermission}
                  onChange={(newValue) => formik.setFieldValue('entryPermission', newValue)}
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
            justifyContent={{ sm: 'space-evenly', lg: 'flex-end' }}
            gap={{ sm: '0', lg: '1.5rem' }}
            margin={'2rem 0'}
          >
            <Button
              onClick={() => router.push('/application/f95a3f7e-6a1f-4326-8718-fa439a3c5306?step=1')}
              text='Atrás'
              variant='outline'
            />
            <Button
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