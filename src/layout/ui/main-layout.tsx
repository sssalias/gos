import { SideBar } from 'src/widgets/sidebar'

type Props = {
    children: React.ReactNode
}
const MainLayout: React.FC<Props> = props => {
    return (
        <div className='p-5'>
            <SideBar/>
            <main>{props.children}</main>
        </div>
    )
}
export default MainLayout