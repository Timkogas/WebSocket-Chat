import './Navigation.css';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/actions/usersActions';

function Navigation() {
  const {user} = useSelector(state => state.users);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser(navigate));
  };
  return (
    <header className='header'>
      <div className='header_logo'>
        <Link to='/' className='header_logo_link'>Chat</Link>
      </div>
      {!user ? 
        <nav className='header_nav'>
          <NavLink to='/sign-up' className='header_link'>SIGN UP</NavLink>
          <NavLink to='/log-in' className='header_link'>LOGIN IN</NavLink>
        </nav>
      : 
        <div className='header_nav'>
          <p className='header_link header_text'> Hello, {user.username}!</p>
          <span className='header_link header_text'>|</span>
          <p className='header_link' onClick={logout}>LOGOUT</p>
        </div>
      }
    </header>
  );
}

export default Navigation;
