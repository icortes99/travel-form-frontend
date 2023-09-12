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
  size?: string
  onSubmit: () => void
}

const CustomModal: FC<ModalProps> = ({ title, children, finalFocusRef, exitButton = false, isOpen, onClose, size = 'lg', onSubmit }: ModalProps) => {
  return (
    <Modal
      onClose={onClose}
      finalFocusRef={finalFocusRef}
      isOpen={isOpen}
      scrollBehavior={'inside'}
      size={{ sm: 'full', md: 'xl' }}
    >
      <ModalOverlay />
      <ModalContent
        backgroundColor={'white'}
      >
        <ModalHeader
          py={0}
          marginTop={'.3rem'}
          padding={'.5rem 1rem'}
          fontWeight={'normal'}
          fontSize={'normal'}
          color={`white.text`}
        >
          {title}
          {exitButton && <ModalCloseButton />}
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter
          display={'flex'}
          width={'100%'}
          justifyContent={'space-evenly'}
        >
          <Button
            text='Atras'
            onClick={onClose}
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