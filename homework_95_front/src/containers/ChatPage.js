import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatField from "../components/ChatField/ChatField";
import UsersList from "../components/UsersList/UsersList";
import { fetchMessages, sendMessageSuccess } from "../store/actions/messagesActions";

function ChatPage() {
  const [waitingToReconnect, setWaitingToReconnect] = useState(null);
  const {user} = useSelector(state => state.users);
  const {messages} = useSelector(state => state.messages);
  const [fields, setFields] = useState({
    text: ''
  })
  const dispatch = useDispatch();
  const [users, setUsers] = useState([])
  
  useEffect(()=>{
    dispatch(fetchMessages())
  }, [dispatch])

  const wsRef = useRef()

  useEffect(()=>{

    if (waitingToReconnect) {
      return;
    }

    wsRef.current = new WebSocket(`ws://localhost:8000/messages/chat?token=${user.token}`)
    wsRef.current.onopen = () => {
      console.log('connected')
    }
    wsRef.current.onclose = () => {
      console.log('connection lost, reconnect will be attempted in 3 second')
      if (wsRef.current) {
        console.log('ws closed by server');
      } else {
        console.log('ws closed by app component unmount');
        return;
      }
      if (waitingToReconnect) {
        return;
      };
      console.log('ws closed');
      setWaitingToReconnect(true);
      setTimeout(() => setWaitingToReconnect(null), 3000);
    }
    
    wsRef.current.addEventListener('message', (msg)=>{
      const decodedMessage = JSON.parse(msg.data)
      switch(decodedMessage.type) {
        case "NEW_MESSAGE":
          dispatch(sendMessageSuccess(decodedMessage.message))
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

    return ()=> {
      wsRef.current.close(); 
      wsRef.current = null
    }
  }, [waitingToReconnect, dispatch, user.token])

  const inputChangeHandler = (e) => {
    const {name, value} = e.target;
    setFields((prevState) => {
        return {
            ...prevState,
            [name]: value
        }
    });
  };

  const sendMessageHandler = (e) => {
    e.preventDefault()
    wsRef.current.send(JSON.stringify({
      type: "MESSAGE_CREATED",
      message: fields.text
    }))
    setFields({text: ''})

  }
  return (
    <div style={{'width': '90%', 'margin': '0 auto', 'display': 'flex', 'gap': '60px'}}>
        <UsersList users={users}/>
        <ChatField 
          messages={messages}
          fields={fields}
          inputChangeHandler={inputChangeHandler}
          sendMessageHandler={sendMessageHandler}
          />
    </div>
  );
}

export default ChatPage;
