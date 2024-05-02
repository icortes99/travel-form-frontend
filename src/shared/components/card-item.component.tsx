import { FC } from 'react'
import { Card, CardBody, Image, Stack, Heading, Text } from '@chakra-ui/react'

interface CardItemProps {
  data: {
    uuid?: string
    name?: string
    images?: string | string[]
    description?: string
  }
  onClick?: (param: string) => void
  width?: string
}

const CardItem: FC<CardItemProps> = ({ data: { uuid = '', name = '', description = '', images = [] }, onClick, width }: CardItemProps) => {
  const handleClick = () => {
    onClick?.(uuid)
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
        src={typeof images === 'string' ? images : images[0]}
        alt={`${name} image`}
        marginBottom={'.5rem'}
        borderRadius={'.7rem'}
      />

      <Stack>
        <CardBody padding={'0 1rem 1rem'}>
          <Heading
            size='md'
            py='1'
            color={`white.text`}
            marginBottom={'.3rem'}
          >
            {name}
          </Heading>

          <Text
            py={0}
            marginBottom={0}
            color={`white.subTitles`}
          >
            {description}
          </Text>
        </CardBody>
      </Stack>
    </Card>
  )
}

export default CardItem