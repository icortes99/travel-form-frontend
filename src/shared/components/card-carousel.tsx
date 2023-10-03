import { FC } from 'react'
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Box
} from '@chakra-ui/react'
import Carousel from './carousel'
import Button from './button'

interface CardCarouselProps {
  obj: {
    images: string[]
    name: string
    description: string
    id: number
  }
  onCLick: (selected: number) => void
}

const CardCarousel: FC<CardCarouselProps> = ({ obj, onCLick }: CardCarouselProps) => {
  return (
    <Card
      maxW='sm'
      width={'100%'}
      borderRadius={'.9rem'}
      backgroundColor={`white.main`}
      margin={{ sm: '0 0 1.5rem 0', lg: '0 .75rem 1.5rem' }}
      boxShadow={'1px 6px 10px 0px rgba(0,0,0,0.44)'}
    >
      <Carousel images={obj.images} />
      <CardBody py={3}>
        <Stack mt='0' spacing='0'>
          <Heading
            py={1}
            size='md'
            color={`white.text`}
          >
            {obj.name}
          </Heading>
          <Box
            display={'flex'}
            width={'100%'}
            justifyContent={'space-between'}
          >
            <Text
              size='md'
              py={0}
              marginTop={'.3rem'}
              marginLeft={'.8rem'}
              marginBottom={'.3rem'}
              color={`white.text`}
            >
              {obj.description}
            </Text>
            <Button
              text='Seleccionar'
              onClick={() => onCLick(obj.id)}
              variant='solid'
              size='sm'
            />
          </Box>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default CardCarousel