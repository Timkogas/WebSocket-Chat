import './InputForm.css'

function InputForm({name, state, placeholder, onChange, type='text', error}) {

    const style = {
      'border': `1px solid ${error ? 'red' : 'rgb(63, 63, 63)'}`
    }

    let input = <div className='form_input_wrapper'>
      <input
        className='form_input'
        id={name}
        name={name}
        type={type}
        value={state?.[name]}
        onChange={onChange}
        style={style}
        placeholder={placeholder}
      >
      </input>
    </div>

    return (
    <>
      {input}
    </>
    
  )

}

export default InputForm;