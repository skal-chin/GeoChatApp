import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../utils/api_context";
import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';

export const RoomList = ({userLocation}) => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [creatingRoom, setCreatingRoom] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [distanceBounds, setDistanceBounds] = useState(0);

  const api = useContext(ApiContext);

  useEffect(async () => {
    let roomList = await api.get('/chat_rooms');
    setRooms(roomList.chatRooms)
    setDistanceBounds(50);

  }, []);

  useEffect(async () => {
    let newRooms = [];
    if (rooms) {
      const userLoc = new mapboxgl.LngLat(userLocation.longitude, userLocation.latitude)
      for (let room of rooms) {
        const roomLoc = new mapboxgl.LngLat(room.longitude, room.latitude);
        const distance = userLoc.distanceTo(roomLoc) / 1000;
        const distanceMiles = distance * .62137;
        if (distanceMiles < distanceBounds) {
          newRooms.push(room);
        }
      }
      console.log(rooms);
      console.log(newRooms);
      setRooms(newRooms);
    }

  }, [distanceBounds]);

  const createRoom = async () => {

    setCreatingRoom(true);
    if (roomName) {
      const roomBody = {
        name : roomName,
        longitude : userLocation.longitude,
        latitude : userLocation.latitude,
      };

      const newRoom = await api.post('/chat_rooms', roomBody)
      console.log(newRoom.newChatRoom);
      setRooms([...rooms, newRoom.newChatRoom]);
      setRoomName('');
      setCreateSuccess(true);
    }

  };

  return (
    <div>
      <div>
        <input
        className="create-box"
        type="text"
        value={roomName}
        placeholder="New Room" 
        onChange={(e) => setRoomName(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            createRoom();
          }
        }}
        />
      </div>

      {rooms && 
          rooms.map((room) => (
            
            <div className="channel-box" key={room.id}>
              <Link to={`/chat_rooms/${room.id}`}>{room.name}</Link>
            </div>
      ))}

    </div>
  )
}