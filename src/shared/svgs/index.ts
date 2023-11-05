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

const flagsData = {
  Argentina: { countryCode: '+54', svg: Argentina },
  Bolivia: { countryCode: '+591', svg: Bolivia },
  Chile: { countryCode: '+56', svg: Chile },
  Colombia: { countryCode: '+57', svg: Colombia },
  CostaRica: { countryCode: '+506', svg: CostaRica },
  Cuba: { countryCode: '+53', svg: Cuba },
  Ecuador: { countryCode: '+593', svg: Ecuador },
  Guatemala: { countryCode: '+502', svg: Guatemala },
  Honduras: { countryCode: '+504', svg: Honduras },
  Mexico: { countryCode: '+52', svg: Mexico },
  Nicaragua: { countryCode: '+505', svg: Nicaragua },
  Panama: { countryCode: '+507', svg: Panama },
  Paraguay: { countryCode: '+595', svg: Paraguay },
  Peru: { countryCode: '+51', svg: Peru },
  PuertoRico: { countryCode: '+1', svg: PuertoRico },
  RD: { countryCode: '+1', svg: RD },
  Salvador: { countryCode: '+503', svg: Salvador },
  Spain: { countryCode: '+34', svg: Spain },
  Uruguay: { countryCode: '+598', svg: Uruguay },
  Venezuela: { countryCode: '+58', svg: Venezuela }
}

interface Flag {
  countryCode: string
  svg: any
}

export default Object.values(flagsData) as Array<Flag>