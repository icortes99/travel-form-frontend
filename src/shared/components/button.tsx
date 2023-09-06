import { Button as ChakraButton } from '@chakra-ui/react'
import { FC } from 'react'

interface ButtonProps {
  text: string,
  onClick: () => void,
  variant: string
}

const Button: FC<ButtonProps> = ({ text, onClick, variant }: ButtonProps) => {
  return (
    <ChakraButton
      onClick={onClick}
      variant={variant}
    >
      {text}
    </ChakraButton>
  )
}

export default Button