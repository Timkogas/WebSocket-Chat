import Button from '../UI/Button/Button';
import InputForm from '../UI/InputForm/InputForm';
import './MessageForm.css'

function MessageForm({inputChangeHandler, fields, sendMessageHandler}) {
  return ( 
  <>
    <form className='message_form_wrapper' onSubmit={(e)=>{sendMessageHandler(e)}}>
      <InputForm 
        placeholder='Enter message'
        state={fields}
        name='text'
        onChange={(e)=>{inputChangeHandler(e)}}
        >

      </InputForm>
      <Button>Send</Button>
    </form>
  </> );
}

export default MessageForm