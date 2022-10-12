import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Preloader from "../components/UI/Preloader/Preloader";
import UserForm from "../components/UserForm/UserForm";
import {registerUser, setNullRegisterError } from "../store/actions/usersActions";

function Register() {
    const [state, setState] = useState({
      username: "",
      password: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {registerError, loading} = useSelector(state => state.users);

  useEffect(()=>{
    return ()=> {
      dispatch(setNullRegisterError())
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

  const buttonRegisterUser = async (e) => {
    e.preventDefault();
    await dispatch(registerUser(state, navigate))
  }
  const buttonLoginUser = (e) => {
    e.preventDefault();
    navigate('/log-in')
  }

  return ( 
    <>
      <Preloader 
        showPreloader={loading}
      />
      <UserForm
         error={registerError}
         onClickFirstBtn={buttonRegisterUser}
         onClickSecondBtn={buttonLoginUser}
         state={state}
         onChange={inputChangeHandler}
         buttonTextFirst={"sign up"}
         buttonTextSecond={"log in"}
      />
    </> 
  );
}

export default Register;