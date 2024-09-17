import clsx from 'clsx'
import { useSideStore } from 'src/store/side'
import { Header } from 'src/widgets/header'
import { SideBar } from 'src/widgets/sidebar'

type Props = {
    children: React.ReactNode
    title: string
}
const MainLayout: React.FC<Props> = props => {

    const {isSmall} = useSideStore()

    return (
        <div className='p-5'>
            <SideBar/>
            <div className={clsx(!isSmall ? 'ml-[275px]' : 'ml-[100px]', 'transition-all')}>
                <Header/>
                <main className='mt-[100px]'>
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