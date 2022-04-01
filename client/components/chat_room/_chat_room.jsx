import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router";
import { ApiContext } from "../../utils/api_context";
import { useMessages } from "../../utils/use_messages";
import { MessageBox } from "../common/message_box";

export const ChatRoom = () => {
  const [chatRoom, setChatRoom] = useState(null);
  const [contents, setContents] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const api = useContext(ApiContext);

  const [messages, sendMessages] = useMessages(chatRoom);

  useEffect(async () => {
    const { user } = await api.get('/users/me');
    setUser(user);
    const chatRoom = await api.get(`/chat_rooms/${id}`)
    console.log(chatRoom.chatRoom.name);
    setChatRoom(chatRoom.chatRoom);
    setLoading(false);

  }, []);

  if (loading) {
    return 'loading';
  }

  return (
    <div>
      <div className="top-bar">
        {chatRoom.name}
      </div>
      <div className="messages-container">
        {messages.map ((message) => (
          <div key={message.id}>
            <MessageBox contents={message.contents} userName={message.userName}></MessageBox>
          </div>
        ))}
      </div>

      <div className="chat-container">
        <textarea placeholder="Start Typing..." type="text" value={contents} onChange={(e) => setContents(e.target.value)} />
        <button onClick={() => sendMessages(contents, user)}>Send</button>
      </div>

    </div>
  )
}