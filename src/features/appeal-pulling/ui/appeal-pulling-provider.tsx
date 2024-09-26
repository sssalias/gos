import { useAppealPulling } from 'src/features/appeal-pulling/libs'

type Props = {
   children: React.ReactNode 
}
const AppealPullingProvider: React.FC<Props> = props => {
    useAppealPulling()
    return props.children
}

export default AppealPullingProvider