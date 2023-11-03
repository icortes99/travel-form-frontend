import { Box, Text } from '@chakra-ui/react'
import { FC } from 'react'
import styles from '../../../styles/error.module.css'

interface ErrorProps {
  message: string
}

const Error: FC<ErrorProps> = ({ message }: ErrorProps) => {
  return (
    <Box
      className={`${styles.error} ${message ? styles.error__shown : styles.error__hidden}`}
    >
      <Text
        color={'white.error'}
        fontSize={'.8rem'}
        padding={0}
        margin={0}
        className={message ? styles.text__shown : styles.text__hidden}
      >
        {message}
      </Text>
    </Box>
  )
}

export default Error