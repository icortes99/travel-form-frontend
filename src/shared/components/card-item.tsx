import { FC } from 'react'
import { Card, CardBody, Image, Stack, Heading, Text } from '@chakra-ui/react'

interface CardItemProps {
  obj: {
    id: number
    name: string
    images: string | string[]
    description: string
  }
  onClick?: (param: number) => void
  width?: string
}

const CardItem: FC<CardItemProps> = ({ obj, onClick, width }: CardItemProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(obj.id)
    }
  }

  return (
    <Card
      overflow='hidden'
      variant='outline'
      border={0}
      margin={'0'}
      onClick={handleClick}
      backgroundColor={'transparent'}
      width={width}
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%' }}
        minW={{ base: '100%' }}
        maxH={{ base: '9rem' }}
        src={typeof obj.images === 'string' ? obj.images : obj.images[0]}
        alt={`${obj.name} image`}
        marginBottom={'.5rem'}
        borderRadius={'.7rem'}
      />

      <Stack>
        <CardBody padding={'0 1rem 1rem'}>
          <Heading
            size='md'
            py='1'
            color={`white.text`}
          >
            {obj.name}
          </Heading>

          <Text
            py={0}
            marginBottom={0}
            color={`white.subTitles`}
          >
            {obj.description}
          </Text>
        </CardBody>
      </Stack>
    </Card>
  )
}

export default CardItem