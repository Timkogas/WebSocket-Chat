import './Navigation.css';
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <header className='header'>
      <div className='header_logo'>
        <Link to='/' className='header_logo_link'>Chat</Link>
      </div>
    </header>
  );
}

export default Navigation;
