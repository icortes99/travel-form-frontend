import { FC } from 'react'
import styles from '../../../styles/loader.module.css'

interface LoadingProps {
  area?: 'full' | 'partial' | 'blur'
}

const Loading: FC<LoadingProps> = ({ area = 'full' }: LoadingProps) => {
  const className = area === 'partial' ?
    styles.loader_container_inside :
    area === 'full' ?
    styles.loader_container :
    `${ styles.loader_container } ${ styles.loader_blur }
  `

  return (
    <div
      className={className}
    >
      <span className={styles.loader}></span>
    </div>
  )
}

export default Loading