import { useEffect, useRef, useState } from "react";

function ChatPage() {
  const [messages, setMessages] = useState([{text: 'test', username: 'testName'}])

  const wsRef = useRef()
  useEffect(()=>{
    wsRef.current = new WebSocket("ws://localhost:8000/chat")

    wsRef.current.onclose = () => console.log('connection lost')

    wsRef.current.addEventListener('message', (msg)=>{
      const decodedMessage = JSON.parse(msg.data)
      console.log(decodedMessage)
      switch(decodedMessage.type) {
        case "NEW_MESSAGE":
          setMessages(prevState=>{
            return prevState.concat(decodedMessage.message)
          });
          break;
      }
    })
    return ()=>wsRef.current.close()
  },[])
  return (
    <div className="App">
      {messages.map((message)=>{
        return (
        <>
           <b>{message.username}</b>
           <p>{message.text}</p>
        </>
        )
      })}
    </div>
  );
}

export default ChatPage;
