import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { useUserQuery, useCreateApplicationMutation } from '../src/shared/generated/graphql-schema'
import Button from '../src/shared/components/button'
import CardCarousel from '../src/shared/components/card-carousel'
import InputDate from '../src/shared/components/input-date'
import InputDropdown from '../src/shared/components/input-dropdown'
import Input from '../src/shared/components/input'
import FormTemplate from '../src/modules/applications/application-form/form-template'
import Modal from '../src/shared/components/modal'
import CardItem from '../src/shared/components/card-item'
import { Box, Checkbox, useDisclosure } from '@chakra-ui/react'
import { useRef } from 'react'
import DestinationView from '../src/modules/applications/application-form/destination-view'
import InfoView from '../src/modules/applications/application-form/info-view'
import HotelView from '../src/modules/applications/application-form/hotel-view'

export default function Home() {
  /*const user = useUserQuery({
    variables: {
      where: {
        email: 'cortes.ivan353@gmail.com'
      }
    }
  })*/

  //const [createApplication] = useCreateApplicationMutation()

  /*const handleClick = async ()=>{
    const response = await createApplication({
      variables: {
        data: {

        }
      }
    })
  }*/

  //console.log('user: ', user)

  const images = [
    'https://images.unsplash.com/photo-1524008279394-3aed4643b30b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlzbmV5fGVufDB8fDB8fHww&w=1000&q=80',
    'https://images.unsplash.com/photo-1632754120060-5a14b0dd5ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGlzbmV5JTIwd29ybGR8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
    'https://www.elespectador.com/resizer/MFd9UJWXzkpFw7FYdOJDKmvINIQ=/568x378/filters:quality(60):format(jpeg)/cloudfront-us-east-1.images.arcpublishing.com/elespectador/4C3EHKXPIRBWPJBZCYPFFPFUDU.jpg'
  ]

  const options = [
    'opcion 1',
    'opcion 2',
    'opcion 3',
    'opcion 4',
    'opcion 5'
  ]

  const { isOpen, onOpen, onClose } = useDisclosure()
  const modalRef = useRef(null)

  const items = [
    {
      title: 'Piratas del caribe',
      description: 'Esto es una descripcion, debe ser un poco larga asi que estoy agregando rellendo',
      image: 'https://media.disneylandparis.com/d4th/es-es/images/n014915_2027jul10_world_panoramique-pirates-of-the-caribbean_16-9_tcm797-162428.jpg'
    },{
      title: 'Castillo de cenicienta',
      description: 'Esto es una descripcion, debe ser un poco larga asi que estoy agregando rellendo',
      image: 'https://media.admagazine.com/photos/618a5f1a72049e253173e684/1:1/w_3008,h_3008,c_limit/91777.jpg'
    },{
      title: 'Arbol magico',
      description: 'Esto es una descripcion, debe ser un poco larga asi que estoy agregando rellendo',
      image: 'https://www.disneylandiaaldia.com/wp-content/uploads/2014/02/casa-del-%C3%A1rbol-de-chip-y-dale.jpg'
    }
  ]

  return (
    /*<Box className={styles.container}>
      <Head>
        <title>Travel forms</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <FormTemplate
          title='Titulo'
          description='descripcion'
          step={3}
        >
          <Button 
            text='Modal'
            onClick={onOpen} 
            variant='solid'
          />
          <CardCarousel 
            title='Disneyland Paris' 
            images={images} 
            description='Orlando, Florida'
          />
          <label htmlFor='date'>Fecha</label>
          <InputDate 
            id='date' 
            placeholder='Fecha de nacimiento' 
          />
          <InputDropdown
            name='test'
            placeholder='prueba'
            options={options}
          />
          <Input
            name='aja'
            placeholder='ajajaaa'
          />
          <Modal
            title='Test'
            description='description test'
            finalFocusRef={modalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            {
              items.map((item, i) => (
                <Box key={i} display='flex'>
                  <CardItem obj={item} />
                  <Checkbox
                    size='lg'
                    colorScheme='pink'
                    isRequired
                    isInvalid
                    errorBorderColor='#3182ce'
                    marginTop={'3rem'}
                    marginLeft={'1rem'}
                  />
                </Box>
              ))
            }
          </Modal>
        </FormTemplate>
      </main>
    </Box>
  */
    <HotelView
      passengers={3}
    />
  )
}
