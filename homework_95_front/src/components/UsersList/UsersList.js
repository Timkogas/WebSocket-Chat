import './UsersList.css'

function UsersList() {
  return ( 
  <>
    <div className='users_list_wrapper'>
      <h2 className='users_list_title'>Users Online</h2>
      <ul className='users_list'>
        <li className='users_list_item'>User</li>
        <li className='users_list_item'>User2</li>
        <li className='users_list_item'>User3</li>
      </ul>
    </div>
  </> );
}

export default UsersList


