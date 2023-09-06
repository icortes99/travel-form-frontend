import { FC } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import Button from './button'

interface ModalProps {
  title: string
  children: any
  btnRef: any
  exitButton: boolean
  onSubmit: () => void
  onCancel: () => void
}

const CustomModal: FC<ModalProps> = ({ title, children, btnRef, exitButton = false, onSubmit, onCancel }: ModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Modal
      onClose={() => console.log('closed')}
      finalFocusRef={btnRef}
      isOpen={true}
      scrollBehavior={'inside'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {title}
          {exitButton && <ModalCloseButton />}
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button
            text='Atras'
            onClick={onCancel}
            variant='outline'
          />
          <Button
            text='Continuar'
            onClick={onSubmit}
            variant='solid'
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CustomModal