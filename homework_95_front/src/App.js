import Layout from "./components/Layout/Layout";
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import ChatPage from "./containers/ChatPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<Layout/>}>
            <Route path='/'element={<ChatPage/>} />
          </Route>
        <Route/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
