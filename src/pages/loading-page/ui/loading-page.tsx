import { Spinner } from '@nextui-org/react'

const LoadingPage: React.FC = () => {
    return (
        <div className='h-[100vh] w-full flex flex-col items-center justify-center gap-4'>
            <h1 className='text-main-blue font-semibold text-lg'>Загрузка...</h1>
            <Spinner size='lg'/>
        </div>
    )
}
export default LoadingPage