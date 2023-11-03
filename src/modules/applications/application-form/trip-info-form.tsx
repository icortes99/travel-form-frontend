import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as yup from 'yup'
import FormTemplate from './form-template'
import { TripObjective } from '../../../shared/generated/graphql-schema'
import InputRadioOptions from '../../../shared/components/input-radio-options.component'
import {
  FormControl,
  FormLabel,
  Box,
  Divider,
  Text
} from '@chakra-ui/react'
import Button from '../../../shared/components/button.component'
import { useTranslation } from '../../../shared/hooks'
import FieldDropdown from '../../../shared/components/field-dropdown.component'
import FieldDate from '../../../shared/components/field-date.component'
import Field from '../../../shared/components/field.component'

interface InfoViewProps {
  lsKey: string
}

const InfoView: FC<InfoViewProps> = ({ lsKey }: InfoViewProps) => {
  const router = useRouter()
  const agency = 'FantasticTravel'
  const { t, enumT } = useTranslation()

  const cantidad = []
  for (let i = 1; i <= 40; i++) {
    cantidad.push(i.toString())
  }

  const schema = yup.object().shape({
    name: yup.string().min(3, t('error.tooShort')).required(t('error.required')),
    lastname: yup.string().min(3, t('error.tooShort')).required(t('error.required')),
    birth: yup.date().max(new Date(), t('error.invalidDate')).required(t('error.required')),
    startDate: yup.date().min(new Date(), t('error.invalidDate')).required(t('error.required')),
    exitDate: yup.date().min(yup.ref('startDate'), t('error.invalidDate')).required(t('error.required')),
    country: yup.string().min(3, t('error.tooShort')).required(t('error.required')),
    tripObjective: yup.string().oneOf(Object.keys(TripObjective)).required(t('error.required')),
    companions: yup.string().oneOf(['Si', 'No', 'Yes']).required(t('error.required')),
    cantityCompanions: yup.number().required(t('error.required')),
    entryPermission: yup.string().oneOf(['Si', 'No', 'Yes']).required(t('error.required'))
  })

  const initialValues = JSON.parse(localStorage.getItem(lsKey)) || {
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
  }

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: values => {
      window.localStorage.setItem(lsKey, JSON.stringify(values))
      router.push(`/application/${agency}?step=3`)
    }
  })

  return (
    <FormTemplate
      title={'applicationForm.info.title'}
      description={'applicationForm.info.description'}
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
              <Field
                label={'applicationForm.info.questions.name'}
                input={{
                  name: 'name',
                  placeholder: 'Leonardo',
                  value: formik.values.name,
                  onChange: formik.handleChange,
                  isOk: !(formik.touched.name && !!formik.errors.name),
                  onBlur: formik.handleBlur
                }}
                error={formik.touched.name && formik.errors.name && formik.errors.name.toString()}
                styles={{ marginBottom: { sm: '1.5rem', md: '1.5rem', lg: '3rem' } }}
              />
              <Field
                label={'applicationForm.info.questions.lastName'}
                input={{
                  name: 'lastname',
                  placeholder: 'Silva',
                  value: formik.values.lastname,
                  onChange: formik.handleChange,
                  isOk: !(formik.touched.lastname && !!formik.errors.lastname),
                  onBlur: formik.handleBlur
                }}
                error={formik.touched.lastname && formik.errors.lastname && formik.errors.lastname.toString()}
                styles={{ marginBottom: { sm: '1.5rem', md: '1.5rem', lg: '3rem' } }}
              />
              <FieldDate
                label={'applicationForm.info.questions.birthdate'}
                input={{
                  name: 'birth',
                  placeholder: 'mm/dd/aaaa',
                  value: formik.values.birth,
                  onChange: formik.handleChange,
                  isOk: !(formik.touched.birth && !!formik.errors.birth),
                  onBlur: formik.handleBlur
                }}
                error={formik.touched.birth && formik.errors.birth && formik.errors.birth.toString()}
                styles={{ marginBottom: '1.5rem' }}
              />
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
              gridGap={'1.5rem 2rem'}
            > { /* COLUMNA 2 */}
              <FieldDate
                label={'applicationForm.info.questions.entryDate'}
                input={{
                  name: 'startDate',
                  placeholder: 'mm/dd/aaaa',
                  value: formik.values.startDate,
                  onChange: formik.handleChange,
                  isOk: !(formik.touched.startDate && !!formik.errors.startDate),
                  onBlur: formik.handleBlur
                }}
                error={formik.touched.startDate && formik.errors.startDate && formik.errors.startDate.toString()}
                styles={{ marginBottom: '1.5rem' }}
              />
              <FieldDate
                label={'applicationForm.info.questions.departureDate'}
                input={{
                  name: 'exitDate',
                  placeholder: 'mm/dd/aaaa',
                  value: formik.values.exitDate,
                  onChange: formik.handleChange,
                  isOk: !(formik.touched.exitDate && !!formik.errors.exitDate),
                  onBlur: formik.handleBlur
                }}
                error={formik.touched.exitDate && formik.errors.exitDate && formik.errors.exitDate.toString()}
                styles={{ marginBottom: '1.5rem' }}
              />
              <Field
                label={'applicationForm.info.questions.residenceCountry'}
                input={{
                  name: 'country',
                  placeholder: 'Costa Rica',
                  value: formik.values.country,
                  onChange: formik.handleChange,
                  isOk: !(formik.touched.country && !!formik.errors.country),
                  onBlur: formik.handleBlur
                }}
                error={formik.touched.country && formik.errors.country && formik.errors.country.toString()}
                styles={{ marginBottom: '1.5rem' }}
              />
              <FieldDropdown
                label={'applicationForm.info.questions.tripObjective'}
                input={{
                  name: 'tripObjective',
                  placeholder: 'Solo',
                  options: 'enums.tripObjective',
                  value: formik.values.tripObjective,
                  onChange: formik.handleChange,
                  isOk: !(formik.touched.tripObjective && !!formik.errors.tripObjective),
                  onBlur: formik.handleBlur
                }}
                error={formik.touched.tripObjective && formik.errors.tripObjective && formik.errors.tripObjective.toString()}
                styles={{ marginBottom: '1.5rem' }}
              />
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel marginBottom={'1rem'}>{t('applicationForm.info.questions.companions')}</FormLabel>
                <InputRadioOptions
                  name='companions'
                  value={formik.values.companions}
                  onChange={(newValue) => formik.setFieldValue('companions', newValue)}
                />
              </Box>
              <FieldDropdown
                label={'applicationForm.info.questions.cantCompanions'}
                input={{
                  name: 'cantityCompanions',
                  placeholder: '1...30',
                  options: cantidad,
                  value: formik.values.cantityCompanions,
                  onChange: formik.handleChange,
                  isOk: !(formik.touched.cantityCompanions && !!formik.errors.cantityCompanions),
                  onBlur: formik.handleBlur
                }}
                error={formik.touched.cantityCompanions && formik.errors.cantityCompanions && formik.errors.cantityCompanions.toString()}
                styles={{ marginBottom: '1.5rem' }}
              />
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
                <FormLabel marginBottom={'1rem'}>{t('applicationForm.info.questions.entryPermission')}</FormLabel>
                <InputRadioOptions
                  name='entryPermission'
                  value={formik.values.entryPermission}
                  onChange={(newValue) => formik.setFieldValue('entryPermission', newValue)}
                />
              </Box>
              <Text>
                {t('applicationForm.info.questions.text')}
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
              onClick={() => router.push(`/application/${agency}?step=1`)}
              text={t('buttons.back')}
              variant='outline'
            />
            <Button
              text={t('buttons.next')}
              type='submit'
            />
          </Box>
        </form>
      </Box>
    </FormTemplate>
  )
}

export default InfoView