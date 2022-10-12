import './UsersList.css'

function UsersList({users}) {
  return ( 
  <>
    <div className='users_list_wrapper'>
      <h2 className='users_list_title'>Users Online</h2>
      <ul className='users_list'>
        {users.map( (user,i) => {
          return(
          <li className='users_list_item' key={i}>
            {user}
          </li>
        )
        })}
      </ul>
    </div>
  </> );
}

export default UsersList


