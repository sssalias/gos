import { ReactNode } from 'react'
import { useAppealsPulling } from 'src/api/hooks/useAppealsPulling'
import { useOrdersPulling } from 'src/api/hooks/useOrdersPulling'


type PropsType = {
  children: ReactNode
}

const LongPullingProvider = ({children}:PropsType) => {

  useOrdersPulling()
  useAppealsPulling()
  
  return (
      <>
        {children}
      </>
  )
}

export default LongPullingProvider