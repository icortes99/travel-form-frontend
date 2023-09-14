import { FC } from 'react'
import Stepper from '../../../shared/components/stepper'
import {
  Heading,
  Text,
  Box
} from '@chakra-ui/react'

interface FormTemplateProps {
  children: any,
  title: string,
  description: string
  step: number
}

const FormTemplate: FC<FormTemplateProps> = ({ children, title, description, step }: FormTemplateProps) => {
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
            {title}
          </Heading>
          <Text
            color={`white.subTitles`}
            marginBottom={'1.5rem'}
            maxWidth={'100%'}
          >
            {description}
          </Text>
        </Box>
        <Box
          display={'flex'}
          height={'auto'}
          alignItems={'center'}
          justifyContent={'center'}
          padding={'0 1.5rem'}
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