import { Poppins as Font } from 'next/font/google'

const Poppins = Font({
  weight: ['500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export default Poppins