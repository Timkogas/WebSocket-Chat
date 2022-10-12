import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Preloader from "../components/UI/Preloader/Preloader";
import UserForm from "../components/UserForm/UserForm";
import { loginUser, setNullLoginError } from "../store/actions/usersActions";

function Login() {
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const dispatch = useDispatch();
  const {loginError, loading} = useSelector(state => state.users);
  const navigate = useNavigate();

  useEffect(()=>{
    return ()=> {
      dispatch(setNullLoginError())
    }
  }, [dispatch])

  const inputChangeHandler = (e) => {
      const {name, value} = e.target;
      setState((prevState) => {
          return {
              ...prevState,
              [name]: value
          }
      });
  };

  const buttonRegisterUser = (e) => {
    e.preventDefault();
    navigate('/sign-up')
  }

  const buttonLoginUser = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(state, navigate))
  }

  return ( 
    <>
      <Preloader
        showPreloader={loading}
      />
      <UserForm
         error={loginError}
         onClickFirstBtn={buttonLoginUser}
         onClickSecondBtn={buttonRegisterUser}
         state={state}
         onChange={inputChangeHandler}
         buttonTextFirst={"log in"}
         buttonTextSecond={"sign up"}
      />
    </> 
  );
}

export default Login;