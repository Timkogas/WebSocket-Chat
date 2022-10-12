import Button from '../UI/Button/Button';
import InputForm from '../UI/InputForm/InputForm';
import './MessageForm.css'

function MessageForm() {
  return ( 
  <>
    <form className='message_form_wrapper'>
      <InputForm 
        placeholder='Enter message'
        >

      </InputForm>
      <Button>Send</Button>
    </form>
  </> );
}

export default MessageForm