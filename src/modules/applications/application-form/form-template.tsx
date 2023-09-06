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
    <Box>
      <Heading>
        {title}
      </Heading>
      <Text>
        {description}
      </Text>
      <CustomStepper currentStep={step} />
      <Box>
        {children}
      </Box>
    </Box>
  )
}

export default FormTemplate