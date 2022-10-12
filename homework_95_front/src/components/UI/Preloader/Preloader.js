import preloader from '../../../animations/headphones.gif'
import './Preloader.css'

function Preloader(props) {
  return (
    <div id="preloader" style={{display: `${props.showPreloader ? 'block' : ' none' }`}}>
      <img src={preloader} alt="preloader" id="preloader_animation"/>
    </div>
  )
}

export default Preloader