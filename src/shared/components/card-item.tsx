import { FC } from 'react'
import Button from './button'
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text } from '@chakra-ui/react'

interface CardItemProps {
  obj: {
    image: string
    title: string
    description: string
  }
}

const CardItem: FC<CardItemProps> = ({ obj }: CardItemProps) => {
  return (
    <Card
      overflow='hidden'
      variant='outline'
      border={0}
      margin={'0'}
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%' }}
        maxH={{ base: '9rem' }}
        src={obj.image}
        alt={`${obj.title} image`}
        marginBottom={'.5rem'}
        borderRadius={'.7rem'}
      />

      <Stack>
        <CardBody padding={0}>
          <Heading
            size='md'
            py='1'
          >
            {obj.title}
          </Heading>

          <Text py={0} marginBottom={0}>
            {obj.description}
          </Text>
        </CardBody>
      </Stack>
    </Card>
  )
}

export default CardItem