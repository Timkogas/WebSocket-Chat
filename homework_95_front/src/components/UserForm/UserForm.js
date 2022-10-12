import Button from "../UI/Button/Button";
import InputForm from "../UI/InputForm/InputForm";
import './UserForm.css'
const UserForm = ({state, onChange, buttonTextFirst, buttonTextSecond, onClickFirstBtn, onClickSecondBtn, error}) => {
    return (
      <div className='form_user_wrapper'>
        <form className='form_user'>
            <h1 className='header_logo_link'>
              {buttonTextFirst}
            </h1>
            <InputForm
              error={error}
              name='username'
              state={state}
              onChange={(e)=>{onChange(e)}}
              placeholder='username'
            />
            <InputForm
              error={error}
              name='password'
              state={state}
              type='password'
              onChange={(e)=>{onChange(e)}}
              placeholder='password'
            />
            {error && <p style={{color: "red", width: '80%', textAlign: 'center'}}>{error}</p>}
            <Button
                backgroundColor='#1ED760'
                borderColor='#1ED760'
                width='80%'
                onClick={(e)=>{onClickFirstBtn(e)}}
              >
              {buttonTextFirst}
            </Button>
            <span className='user_form_hr'>Or</span>
            <Button
                backgroundColor='#111315'
                borderColor='white'
                width='80%'
                onClick={(e)=>{onClickSecondBtn(e)}}
              >
              {buttonTextSecond}
            </Button>
        </form>
      </div>
    )
};

export default UserForm;
