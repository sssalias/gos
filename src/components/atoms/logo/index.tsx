import classes from './style.module.css'
import logo from 'src/assets/logo.png'

const Logo = () => {
  return (
    <div className={classes.logo}>
        <img src={logo} alt=""/>
        <div>
            <h4>СТОЛОВАЯ</h4>
            <h4>МИНПРОСВЕЩЕНИЯ</h4>
            <h4>РОССИИ</h4>
        </div>
    </div>
  )
}

export default Logo