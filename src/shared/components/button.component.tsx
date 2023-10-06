import { Button as ChakraButton } from '@chakra-ui/react'
import { FC } from 'react'

interface ButtonProps {
  text: string,
  onClick?: () => void,
  variant?: string
  size?: string
  type?: 'button' | 'submit' | 'reset'
}

const Button: FC<ButtonProps> = ({ text, onClick, variant = 'solid', size = 'md', type = 'button' }: ButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  }

  return (
    <ChakraButton
      onClick={handleClick}
      variant={variant}
      colorScheme={'teal'}
      size={size}
      type={type}
    >
      {text}
    </ChakraButton>
  )
}

export default Button