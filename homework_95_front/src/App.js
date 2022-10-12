import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom'
import Layout from './components/Layout/Layout';
import ChatPage from './containers/ChatPage';
import Login from './containers/Login';
import Register from './containers/Register';


const ProtectedRoute = ({isAllowed, redirectUrl, children}) => {
  if (!isAllowed) {
      return <Navigate to={redirectUrl} />
  }
  return children || <Outlet />;
};

function App() {

  const {user} = useSelector(state => state.users);

  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout/>}>
          <Route path='/sign-up' element={<Register/>}/>
          <Route path='/log-in' element={<Login/>}/>

          <Route path='/' element={
            <ProtectedRoute
              isAllowed={user}
              redirectUrl={"/log-in"}
            >
              <ChatPage/>
            </ProtectedRoute>
          }/>

          <Route path='*' element={<h1>404</h1>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
