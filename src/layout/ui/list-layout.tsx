import { ListCounter } from 'src/shared/ui'

type Props = {
    children: React.ReactNode
    dataCount: number
}
const ListLayout: React.FC<Props> = props => {
    return (
        <div className='flex flex-col gap-4'>
            <ListCounter count={props.dataCount}/>
            {props.children}
        </div>
    )
}
export default ListLayout