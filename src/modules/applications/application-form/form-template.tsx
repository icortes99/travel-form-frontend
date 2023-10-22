import { FC } from 'react'
import Stepper from '../../../shared/components/stepper.component'
import {
  Heading,
  Text,
  Box
} from '@chakra-ui/react'
import { DictionaryLeaves } from '../../../shared/types'
import { useTranslation } from '../../../shared/hooks'

interface FormTemplateProps {
  children: any,
  title: DictionaryLeaves,
  description: DictionaryLeaves
  step: number
}

const FormTemplate: FC<FormTemplateProps> = ({ children, title, description, step }: FormTemplateProps) => {
  const { t } = useTranslation()

  return (
    <Box
      marginTop={'1.5rem'}
      display={'flex'}
      flexDirection={'column'}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'center'}
      padding={'0 1.5rem'}
    >
      <Box
        display={'flex'}
        flexDirection={{ sm: 'column', md: 'row' }}
        width={'100%'}
        maxWidth={'80rem'}
      >
        <Box
          width={{ sm: '100%', md: '70%', lg: '80%' }}
        >
          <Heading
            textAlign={'left'}
            marginBottom={'1rem'}
            as={'h1'}
            color={`white.text`}
          >
            {t(title)}
          </Heading>
          <Text
            color={`white.subTitles`}
            marginBottom={'1.5rem'}
            maxWidth={'100%'}
          >
            {t(description)}
          </Text>
        </Box>
        <Box
          display={'flex'}
          height={'auto'}
          alignItems={'center'}
          justifyContent={{ md: 'center', lg: 'flex-end' }}
          padding={{ md: '0 1.5rem', lg: '0 0 0 1.5rem' }}
          width={{ sm: '100%', md: '30%', lg: '20%' }}
        >
          <Stepper currentStep={step} />
        </Box>
      </Box>
      <Box
        width={'100%'}
        maxWidth={'80rem'}
      >
        {children}
      </Box>
    </Box>
  )
}

export default FormTemplate