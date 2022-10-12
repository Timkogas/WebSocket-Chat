import MessageForm from '../MessageForm/MessageForm';
import './ChatField.css'

function ChatField() {
  return ( 
  <div className='chat_field_wrapper'>
    <div>
      <h2 className='chat_field_title'>Chat Room</h2>
      <div className='chat_field'>
        <div className='chat_field_message'>
          <b>Admin:</b><p>Message</p>
        </div>
      </div>
    </div>
    <MessageForm/>
  </div> );
}

export default ChatField