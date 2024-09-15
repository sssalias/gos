import logo from 'src/shared/ui/logo/logo.png'


const Logo: React.FC = () => {
    return (
        <div className='text-white flex justify-center items-center gap-[10px]'>
            <img src={logo} alt='Logo' />
            <div className='text-sm font-semibold'>
                <h4>СТОЛОВАЯ</h4>
                <h4>МИНПРОСВЕЩЕНИЯ</h4>
                <h4>РОССИИ</h4>
            </div>
        </div>
    )
}
export default Logo