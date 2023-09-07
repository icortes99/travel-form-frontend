import { FC } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import Button from './button'

interface ModalProps {
  title: string
  children: any
  finalFocusRef: any
  exitButton?: boolean
  isOpen: boolean
  onClose: () => void
}

const CustomModal: FC<ModalProps> = ({ title, children, finalFocusRef, exitButton = false, isOpen, onClose }: ModalProps) => {
  return (
    <Modal
      onClose={onClose}
      finalFocusRef={finalFocusRef}
      isOpen={isOpen}
      scrollBehavior={'inside'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          py={0}
          marginTop={'.3rem'}
          padding={'.5rem 1rem'}
          fontWeight={'normal'}
          fontSize={'normal'}
        >
          {title}
          {exitButton && <ModalCloseButton />}
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button
            text='Atras'
            onClick={onClose}
            variant='outline'
          />
          <Button
            text='Continuar'
            onClick={onClose}
            variant='solid'
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CustomModal