import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChatField from "../components/ChatField/ChatField";
import UsersList from "../components/UsersList/UsersList";

function ChatPage() {
  const {user} = useSelector(state => state.users);
  const [messages, setMessages] = useState([{text: 'test', username: 'testName'}])
  const [users, setUsers] = useState([])

  const wsRef = useRef()
  useEffect(()=>{
    wsRef.current = new WebSocket(`ws://localhost:8000/chat?token=${user.token}`)

    wsRef.current.onclose = () => console.log('connection lost')

    wsRef.current.addEventListener('message', (msg)=>{
      const decodedMessage = JSON.parse(msg.data)
      switch(decodedMessage.type) {
        case "NEW_MESSAGE":
          setMessages(prevState=>{
            return prevState.concat(decodedMessage.message)
          });
          break;
        case 'NEW_ONLINE_USER':
          setUsers(prevState=>{
            return decodedMessage.users
          });
          break;
        default: 
          console.log('no types')
          break;
      }
    })
    return ()=>wsRef.current.close()
  }, [])

  return (
    <div style={{'width': '90%', 'margin': '0 auto', 'display': 'flex', 'gap': '60px'}}>
        <UsersList users={users}/>
        <ChatField messages={messages}/>
    </div>
  );
}

export default ChatPage;
