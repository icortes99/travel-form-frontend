import { Box, Text } from '@chakra-ui/react'
import { FC } from 'react'

interface ErrorProps {
  message: string
}

const Error: FC<ErrorProps> = ({ message }: ErrorProps) => {
  return (
    <Box
    >
      <Text
        color={'white.error'}
        fontSize={'.8rem'}
        padding={0}
        margin={0}
      >
        {message}
      </Text>
    </Box>
  )
}

export default Error