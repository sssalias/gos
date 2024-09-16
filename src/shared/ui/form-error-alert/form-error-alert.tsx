type Props = {
    msg: string | undefined
}

const FormErrorAlert: React.FC<Props> = props => {
    return (
        <span className='text-red-400 text-sm'>{props.msg}</span>
    )
}
export default FormErrorAlert