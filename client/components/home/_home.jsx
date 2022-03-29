import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { RoomList } from '../common/room_list';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [loc, setLoc] = useState(null);
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);

    navigator.geolocation.getCurrentPosition((location) => {
      setLoc(location.coords);
    });
  }, []);

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    // <div className="p-4">
    //   <h1>Welcome {user.firstName}</h1>
    //   <Button type="button" onClick={logout}>
    //     Logout
    //   </Button>
    //   {roles.includes('admin') && (
    //     <Button type="button" onClick={() => navigate('/admin')}>
    //       Admin
    //     </Button>
    //   )}

    //   <div className="side-bar">
    //     {loc &&
    //       <RoomList userLocation={loc}></RoomList>
    //     }

    //   </div>
    // </div>

    <div className="container">
      <div className="side-bar">
        <div className="name-box">{user.firstName[0].toUpperCase()}{user.lastName[0].toUpperCase()}</div>
        <Button className="logout-button" type="button" onClick={logout}>Logout</Button>

        <div>
          {loc && 
            <RoomList userLocation={loc}></RoomList>
          }
        </div>

      </div>
      
      <div className="chat-box">

      </div>

    </div>
  );
};
