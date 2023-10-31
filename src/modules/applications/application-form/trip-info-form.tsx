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
import { useTranslation } from '../../../shared/hooks'
import FieldDropdown from '../../../shared/components/field-dropdown.component'

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
    tripObjective: yup.string().oneOf(Object.values(TripObjective)).required(t('error.required')),
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
              <Box
                marginBottom={{ sm: '1.5rem', md: '1.5rem', lg: '3rem' }}
              >
                <FormLabel>{t('applicationForm.info.questions.name')}:</FormLabel>
                <Input
                  name='name'
                  placeholder='Leonardo'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  isOk={!(formik.touched.name && !!formik.errors.name)}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name.toString()}</div>
                ) : null}
              </Box>
              <Box
                marginBottom={{ sm: '1.5rem', md: '1.5rem', lg: '3rem' }}
              >
                <FormLabel>{t('applicationForm.info.questions.lastName')}:</FormLabel>
                <Input
                  name='lastname'
                  placeholder='Silva'
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  isOk={!(formik.touched.lastname && !!formik.errors.lastname)}
                  onBlur={formik.handleBlur}
                />
              </Box>
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>{t('applicationForm.info.questions.birthdate')}:</FormLabel>
                <InputDate
                  name='birth'
                  placeholder='mm/dd/aaaa'
                  value={formik.values.birth}
                  onChange={formik.handleChange}
                  isOk={!(formik.touched.birth && !!formik.errors.birth)}
                  onBlur={formik.handleBlur}
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
              gridGap={'1.5rem 2rem'}
            > { /* COLUMNA 2 */}
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>{t('applicationForm.info.questions.entryDate')}:</FormLabel>
                <InputDate
                  name='startDate'
                  placeholder='mm/dd/aaaa'
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  isOk={!(formik.touched.startDate && !!formik.errors.startDate)}
                  onBlur={formik.handleBlur}
                />
              </Box>
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>{t('applicationForm.info.questions.departureDate')}:</FormLabel>
                <InputDate
                  name='exitDate'
                  placeholder='mm/dd/aaaa'
                  value={formik.values.exitDate}
                  onChange={formik.handleChange}
                  isOk={!(formik.touched.exitDate && !!formik.errors.exitDate)}
                  onBlur={formik.handleBlur}
                />
              </Box>
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>{t('applicationForm.info.questions.residenceCountry')}:</FormLabel>
                <Input
                  name='country'
                  placeholder='Costa Rica'
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  isOk={!(formik.touched.country && !!formik.errors.country)}
                  onBlur={formik.handleBlur}
                />
              </Box>
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
                error=''
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
              <Box
                marginBottom={'1.5rem'}
              >
                <FormLabel>{t('applicationForm.info.questions.cantCompanions')}:</FormLabel>
                <InputDropdown
                  name='cantityCompanions'
                  placeholder='1...30'
                  options={cantidad}
                  value={formik.values.cantityCompanions}
                  onChange={formik.handleChange}
                  isOk={!(formik.touched.cantityCompanions && !!formik.errors.cantityCompanions)}
                  onBlur={formik.handleBlur}
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