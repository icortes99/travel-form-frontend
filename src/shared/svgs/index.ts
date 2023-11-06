import Argentina from './argentina.svg'
import Bolivia from './bolivia.svg'
import Chile from './chile.svg'
import Colombia from './colombia.svg'
import CostaRica from './costarica.svg'
import Cuba from './cuba.svg'
import Ecuador from './ecuador.svg'
import Guatemala from './guatemala.svg'
import Honduras from './honduras.svg'
import Mexico from './mexico.svg'
import Nicaragua from './nicaragua.svg'
import Panama from './panama.svg'
import Paraguay from './paraguay.svg'
import Peru from './peru.svg'
import PuertoRico from './purtorico.svg'
import RD from './republicadominicana.svg'
import Salvador from './salvador.svg'
import Spain from './spain.svg'
import Uruguay from './uruguay.svg'
import Venezuela from './venezuela.svg'

const flagsData: Flag[] = [
  { countryCode: '+54', svg: Argentina },
  { countryCode: '+591', svg: Bolivia },
  { countryCode: '+56', svg: Chile },
  { countryCode: '+57', svg: Colombia },
  { countryCode: '+506', svg: CostaRica },
  { countryCode: '+53', svg: Cuba },
  { countryCode: '+593', svg: Ecuador },
  { countryCode: '+502', svg: Guatemala },
  { countryCode: '+504', svg: Honduras },
  { countryCode: '+52', svg: Mexico },
  { countryCode: '+505', svg: Nicaragua },
  { countryCode: '+507', svg: Panama },
  { countryCode: '+595', svg: Paraguay },
  { countryCode: '+51', svg: Peru },
  { countryCode: '+1', svg: PuertoRico },
  { countryCode: '+1', svg: RD },
  { countryCode: '+503', svg: Salvador },
  { countryCode: '+34', svg: Spain },
  { countryCode: '+598', svg: Uruguay },
  { countryCode: '+58', svg: Venezuela }
]

interface Flag {
  countryCode: string
  svg: any
}

export default flagsData