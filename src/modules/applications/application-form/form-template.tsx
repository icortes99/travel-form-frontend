import { FC } from 'react'
import CustomStepper from '../../../shared/components/stepper'
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
    >
      <Box>
        <Box
          maxWidth={'45rem'}
        >
          <Heading
            textAlign={'center'}
            marginBottom={'1rem'}
            as={'h1'}
            color={`white.text`}
          >
            {title}
          </Heading>
          <Text
            padding={'0 1rem'}
            color={`white.subTitles`}
            marginBottom={'1.5rem'}
            maxWidth={'45rem'}
          >
            {description}
          </Text>
        </Box>
        <CustomStepper currentStep={step} />
      </Box>
      <Box>
        {children}
      </Box>
    </Box>
  )
}

export default FormTemplate