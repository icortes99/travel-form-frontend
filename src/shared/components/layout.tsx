import { FC } from 'react'
import CustomStepper from './stepper'
import {
  Heading,
  Text,
  Box
} from '@chakra-ui/react'

interface LayoutProps {
  children: any,
  title: string,
  description: string
  step: number
}

const Layout: FC<LayoutProps> = ({ children, title, description, step }: LayoutProps) => {
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

export default Layout