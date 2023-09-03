import { Button } from '@chakra-ui/react'
import { FC } from 'react'

interface ButtonProps {
  name: string,
  action: () => void,
  type: string
}

const CustomButton: FC<ButtonProps> = ({ name, action, type }: ButtonProps) => {
  const variantBtn = type === 'primary' ? 'solid' : 'outline'

  return (
    <Button
      onClick={action}
      variant={variantBtn}
    >
      {name}
    </Button>
  )
}

export default CustomButton