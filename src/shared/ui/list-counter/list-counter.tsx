type Props = {
   count: number 
}
const ListCounter: React.FC<Props> = props => {
    return (
        <h2 className='font-base'>
            <span>Общее количество: </span>
            <strong>{props.count}</strong>
        </h2>
    )
}
export default ListCounter