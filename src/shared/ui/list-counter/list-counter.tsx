type Props = {
   count?: number 
}
const ListCounter: React.FC<Props> = props => {
    if (!props.count) {
        return null
    }
    return (
        <h2 className='font-base'>
            <span>Общее количество: </span>
            <strong>{props.count}</strong>
        </h2>
    )
}
export default ListCounter