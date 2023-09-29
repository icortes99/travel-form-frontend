import { FC, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  useDisclosure,
  Checkbox,
  Divider
} from '@chakra-ui/react'
import FormTemplate from './form-template'
import CardCarousel from '../../../shared/components/card-carousel'
import Modal from '../../../shared/components/modal'
import CardItem from '../../../shared/components/card-item'
import { useAttractionsQuery, useTravelAgencyTemplatesQuery, useUserQuery } from '../../../shared/generated/graphql-schema'

interface DestinationFormProps {
  lsKey: string
}

//eliminar, informacion quemada
const destinies = [
  {
    images: [
      'https://images.unsplash.com/photo-1524008279394-3aed4643b30b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlzbmV5fGVufDB8fDB8fHww&w=1000&q=80',
      'https://images.unsplash.com/photo-1632754120060-5a14b0dd5ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGlzbmV5JTIwd29ybGR8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      'https://www.elespectador.com/resizer/MFd9UJWXzkpFw7FYdOJDKmvINIQ=/568x378/filters:quality(60):format(jpeg)/cloudfront-us-east-1.images.arcpublishing.com/elespectador/4C3EHKXPIRBWPJBZCYPFFPFUDU.jpg'
    ],
    title: 'Disneyland Paris',
    place: 'Orlando, Florida',
    description: 'Únete a Star-Lord y su equipo en Guardians of the Galaxy, una emocionante aventura intergaláctica llena de música y acción en EPCOT'
  }, {
    images: [
      'https://npr.brightspotcdn.com/dims4/default/9e46b47/2147483647/strip/true/crop/1837x1378+0+0/resize/880x660!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fwusf%2Ffiles%2F202006%2Funiversal_hogwarts_colombini.jpg',
      'https://www.visitcalifornia.com/sites/visitcalifornia.com/files/VC_WWoHP_ImageUpdates_Supplied_Portrait-Gallery-in-Hogwarts-Castle-WWoHP-at-USH_1280x640.jpg'
    ],
    title: 'Universal Studios',
    place: 'Orlando, Florida',
    description: 'Únete a Star-Lord y su equipo en Guardians of the Galaxy, una emocionante aventura intergaláctica llena de música y acción en EPCOT'
  }, {
    images: [
      'https://del.h-cdn.co/assets/17/25/980x980/square-1497992586-tokyo-disney-food-intro.jpg',
      'https://cms-image-bucket-production-ap-northeast-1-a7d2.s3.ap-northeast-1.amazonaws.com/images/7/1/6/5/44155617-4-eng-GB/Cropped-1675106513photo_SXM2023013000006598.jpg',
      'https://theroamingtaster.com/wp-content/uploads/2019/09/Tokyo-Disneyland-Fantasyland-6-1024x1024.jpg',
      'https://gaijinpot.scdn3.secure.raxcdn.com/app/uploads/sites/4/2018/04/Small-World-1024x740.jpg'
    ],
    title: 'Disney Tokyo',
    place: 'Tokyo, Japon',
    description: 'Únete a Star-Lord y su equipo en Guardians of the Galaxy, una emocionante aventura intergaláctica llena de música y acción en EPCOT'
  }, {
    images: [
      'https://npr.brightspotcdn.com/dims4/default/9e46b47/2147483647/strip/true/crop/1837x1378+0+0/resize/880x660!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fwusf%2Ffiles%2F202006%2Funiversal_hogwarts_colombini.jpg',
      'https://www.visitcalifornia.com/sites/visitcalifornia.com/files/VC_WWoHP_ImageUpdates_Supplied_Portrait-Gallery-in-Hogwarts-Castle-WWoHP-at-USH_1280x640.jpg'
    ],
    title: 'Universal Studios',
    place: 'Orlando, Florida',
    description: 'Únete a Star-Lord y su equipo en Guardians of the Galaxy, una emocionante aventura intergaláctica llena de música y acción en EPCOT'
  }, {
    images: [
      'https://npr.brightspotcdn.com/dims4/default/9e46b47/2147483647/strip/true/crop/1837x1378+0+0/resize/880x660!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fwusf%2Ffiles%2F202006%2Funiversal_hogwarts_colombini.jpg',
      'https://www.visitcalifornia.com/sites/visitcalifornia.com/files/VC_WWoHP_ImageUpdates_Supplied_Portrait-Gallery-in-Hogwarts-Castle-WWoHP-at-USH_1280x640.jpg'
    ],
    title: 'Universal Studios',
    place: 'Orlando, Florida',
    description: 'Únete a Star-Lord y su equipo en Guardians of the Galaxy, una emocionante aventura intergaláctica llena de música y acción en EPCOT'
  }
]

//eliminar, informacion quemada
const attractions = [
  {
    title: 'Piratas del caribe',
    description: 'Esto es una descripcion, debe ser un poco larga asi que estoy agregando rellendo',
    image: 'https://media.disneylandparis.com/d4th/es-es/images/n014915_2027jul10_world_panoramique-pirates-of-the-caribbean_16-9_tcm797-162428.jpg'
  }, {
    title: 'Castillo de cenicienta',
    description: 'Esto es una descripcion, debe ser un poco larga asi que estoy agregando rellendo',
    image: 'https://media.admagazine.com/photos/618a5f1a72049e253173e684/1:1/w_3008,h_3008,c_limit/91777.jpg'
  }, {
    title: 'Arbol magico',
    description: 'Esto es una descripcion, debe ser un poco larga asi que estoy agregando rellendo',
    image: 'https://www.disneylandiaaldia.com/wp-content/uploads/2014/02/casa-del-%C3%A1rbol-de-chip-y-dale.jpg'
  }
]

const DestinationForm: FC<DestinationFormProps> = ({ lsKey }: DestinationFormProps) => {
  const router = useRouter()
  const [destiny, setDestiny] = useState('')
  const modalRef = useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedAttractions, setSelectedAttractions] = useState([])

  const data = useTravelAgencyTemplatesQuery({
    variables: {
      where: {
        slug: 'FantasticTravel'
      }
    }
  })

  const user = useUserQuery({
    variables: {
      where: {
        email: 'cortes.ivan353@gmail.com'
      }
    }
  })

  const attractions2 = useAttractionsQuery({
    variables: {
      where: {
        id: 2
      }
    }
  })

  console.log('destinos: ', data.data)
  console.log('user: ', user.data)
  console.log('attractions: ', attractions2.data)

  const selectDestiny = (clickedDestiny: string) => {
    setDestiny(clickedDestiny)
    //consultar las atracciones del destino 'destiny' e inicializarlas en el modal
    onOpen()
  }

  const nextStep = () => {
    const data = {
      destination: destiny,
      attractions: selectedAttractions
    }
    window.localStorage.setItem(lsKey, JSON.stringify(data))
    router.push(`/application/f95a3f7e-6a1f-4326-8718-fa439a3c5306?step=2`)
  }

  const handleCheckbox = (attraction: string) => {
    const index = selectedAttractions.indexOf(attraction)

    if (index === -1)
      setSelectedAttractions((previous) => [...previous, attraction])
    else
      setSelectedAttractions((previous) => previous.filter((item) => item !== attraction))
  }

  const closeModal = () => {
    setSelectedAttractions([])
    onClose()
  }

  return (
    <FormTemplate
      title='Escoge un destino'
      description='Comenzaremos con el destino que deseas visitar, te brindamos toda la información necesaria para que tomes la mejor decisión.'
      step={0}
    >
      <Box
        display={'flex'}
        flexDirection={{ sm: 'column', md: 'row' }}
        flexWrap={'wrap'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'100%'}
      >
        {
          destinies.map((destiny, i) => (
            <CardCarousel
              images={destiny.images}
              title={destiny.title}
              description={destiny.place}
              onCLick={selectDestiny}
              key={i}
            />
          ))
        }
      </Box>
      <Modal
        title='Nos gustaría saber cuáles atracciones son las que más te llaman la atención para centrar el viaje en torno a ellas:'
        finalFocusRef={modalRef}
        isOpen={isOpen}
        onClose={closeModal}
        onSubmit={nextStep}
        submitText={selectedAttractions.length === 0 ? 'Omitir' : 'Continuar'}
      >
        {
          attractions.map((item, i) => (
            <>
              <Box
                key={i}
                display='flex'
                cursor={'pointer'}
                backgroundColor={selectedAttractions.includes(item.title) ? `white.itemPink` : `white.white`}
                _hover={{ backgroundColor: '#ffe6ea' }}
                borderRadius={'.9rem'}
              >
                <CardItem
                  obj={item}
                  onClick={() => (handleCheckbox(item.title))}
                />
                <Box
                  display={'flex'}
                  paddingTop={'9.5rem'}
                >
                  <Checkbox
                    size='lg'
                    colorScheme='pink'
                    margin={'0 1rem'}
                    height={'1.6rem'}
                    isChecked={selectedAttractions.includes(item.title) ? true : false}
                    onChange={() => (handleCheckbox(item.title))}
                  />
                </Box>
              </Box>
              {
                (attractions.length - 1) > i &&
                <Divider
                  key={i + 100}
                  margin={'1rem 0 1.5rem'}
                />
              }
            </>
          ))
        }
      </Modal>
    </FormTemplate>
  )
}

export default DestinationForm