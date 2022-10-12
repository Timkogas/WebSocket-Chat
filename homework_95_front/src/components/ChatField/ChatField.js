import MessageForm from '../MessageForm/MessageForm';
import './ChatField.css'

function ChatField({messages, inputChangeHandler, fields, sendMessageHandler}) {
  return ( 
  <div className='chat_field_wrapper'>
    <div>
      <h2 className='chat_field_title'>Chat Room</h2>
      <div className='chat_field'>
        {messages.map((message, i)=>{
          return (
            <div className='chat_field_message' key={i}>
              <b>{message.user}:</b><p>{message.text}</p>
            </div>
          )
        })}
      </div>
    </div>
    <MessageForm 
      inputChangeHandler={inputChangeHandler} 
      fields={fields}
      sendMessageHandler={sendMessageHandler}
    />
  </div> );
}

export default ChatField