import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router";
import { ApiContext } from "../../utils/api_context";

export const ChatRoom = () => {
  const [chatRoom, setChatRoom] = useState(null);
  const [contents, setContents] = useState('');
  const [user, setUser] = useState(null);

  const { id } = useParams();
  const api = useContext(ApiContext);

  const [messages, sendMessages] = useMessages(chatRoom);

  useEffect(async () => {
    const { user } = await api.get('/users/me');
    setUser(user);
    const { chatRoom } = await api.get(`/chat_room/${id}`)
    setChatRoom(chatRoom);

  }, []);


  return (
    <div>
      <div>
        {messages.map ((message) => (
          <div key={message.id}>
            <h3>{ message.user }</h3>
            {message.contents}
          </div>
        ))}
      </div>

      <div>
        <input type="text" value={contents} onChange={(e) => setContents(e.target.value)} />
        <button onClick={() => sendMessages(contents, user)}>Send</button>
      </div>

    </div>
  )
}