import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import DestinationView from '../src/modules/applications/application-form/destination-view'
import InfoView from '../src/modules/applications/application-form/info-view'
import HotelView from '../src/modules/applications/application-form/hotel-view'
import ContactView from '../src/modules/applications/application-form/contact-view'

export default function Home() {
  return (
    <HotelView 
      passengers={3}
    />
  )
}