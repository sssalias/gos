import { Divider, Image } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import logo from './logo.png'

const ErrorPage: React.FC = () => {
    return (
        <div className='h-screen w-full flex flex-col justify-center items-center'> 
            <Image height={300} width={300} src={logo} alt='(('/>
            <div className='h-[100px] flex justify-center items-center gap-3'>
                <h1 className='text-[46px] text-main-blue font-semibold'>404</h1>
                <Divider className='w-[3px] bg-main-blue'  orientation='vertical'/>
                <div>
                    <h2 className='text-xl font-semibold    '>Ой...Такой страницы не существует!</h2>
                    <Link to='/' className='text-primary-300 underline underline-offset-2'>На главную</Link>
                </div>
            </div>
        </div>
    )
}
export default ErrorPage