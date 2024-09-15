import { Header } from 'src/widgets/header'
import { SideBar } from 'src/widgets/sidebar'

type Props = {
    children: React.ReactNode
    title: string
}
const MainLayout: React.FC<Props> = props => {
    return (
        <div className='p-5'>
            <SideBar/>
            <div className='ml-[275px]'>
                <Header/>
                <main className='mt-5'>
                    <h1 className='text-2xl font-bold'>{props.title}</h1>
                    <div className='mt-2'>
                        {props.children}
                    </div>
                </main>
            </div>
        </div>
    )
}
export default MainLayout