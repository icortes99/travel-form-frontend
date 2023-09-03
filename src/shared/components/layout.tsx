import { FC } from 'react'
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
      <Box>
        {children}
      </Box>
    </Box>
  )
}

export default Layout