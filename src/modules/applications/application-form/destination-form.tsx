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
import { useAttractionsLazyQuery, useAttractionsQuery, useTravelAgencyTemplatesQuery } from '../../../shared/generated/graphql-schema'
import Loading from '../../../shared/components/loading.component'

interface DestinationFormProps {
  lsKey: string
}

const DestinationForm: FC<DestinationFormProps> = ({ lsKey }: DestinationFormProps) => {
  const router = useRouter()
  const [destiny, setDestiny] = useState(-1)
  const modalRef = useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedAttractions, setSelectedAttractions] = useState([])

  const agencyTemplates: any = useTravelAgencyTemplatesQuery({
    variables: {
      where: {
        slug: 'FantasticTravel'
      }
    }
  })

  const attractions: any = useAttractionsQuery({
    variables: {
      where: {
        id: 2
      }
    }
  })

  const selectDestiny = (clickedDestiny: number) => {
    setDestiny(() => clickedDestiny)
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

  const handleCheckbox = (attraction: number) => {
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
          agencyTemplates.loading === true ? <Loading area={'partial'} /> :
            agencyTemplates.data.travelAgencyTemplates.applications.map((destiny, i: number) => (
              <CardCarousel
                obj={destiny.destination}
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
        {console.log('attssss: ', attractions)}
        {
          (attractions.loading === false) ?
            attractions.data.destination.attractions.map((item, i) => (
              <>
                {console.log('attractions: ', attractions)}
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
                    onClick={handleCheckbox}
                    width={'90%'}
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
                  (attractions.data.destination.attractions.length - 1) > i &&
                  <Divider
                    key={i + 100}
                    margin={'1rem 0 1.5rem'}
                  />
                }
              </>
            )) : <Loading area='partial' />
        }
      </Modal>
    </FormTemplate>
  )
}

export default DestinationForm