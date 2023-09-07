import { Button as ChakraButton } from '@chakra-ui/react'
import { FC } from 'react'

interface ButtonProps {
  text: string,
  onClick: () => void,
  variant: string
  size?: string
}

const Button: FC<ButtonProps> = ({ text, onClick, variant, size = 'md' }: ButtonProps) => {
  return (
    <ChakraButton
      onClick={onClick}
      variant={variant}
      colorScheme={'teal'}
      size={size}
    >
      {text}
    </ChakraButton>
  )
}

export default Button