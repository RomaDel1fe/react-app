import { useEffect, useState } from 'react';
import Button from '../../components/baseComponents/Button/Button';
import './UserList.css';
import logo from '../../logo.svg';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loadingAlbums, setLoadingAlbums] = useState(false);
  const [loadingPhotos, setLoadingPhotos] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setLoadingAlbums(true);
      fetch(`https://jsonplaceholder.typicode.com/albums?userId=${selectedUser}`)
        .then(response => response.json())
        .then(data => {
          setAlbums(data);
          setLoadingAlbums(false);
        });
    } else {
      setAlbums([]);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedAlbum) {
      setLoadingPhotos(true);
      fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${selectedAlbum}`)
        .then(response => response.json())
        .then(data => {
          setPhotos(data);
          setLoadingPhotos(false);
        });
    } else {
      setPhotos([]);
    }
  }, [selectedAlbum]);

  return(
    <div className='UsersList'>
      <div className='UsersList-container'>
        {users.map(user => (
          <div key={user.id} className='UserItem'>
            <h2 className='UserName'>{user.name}</h2>
            <Button type='secondary' label='Albums' onClick={() => setSelectedUser(user.id === selectedUser ? null : user.id)} />
            {selectedUser === user.id && (loadingAlbums ? <div ><img src={logo} className="App-logo" alt="logo" /></div> : albums.map(album => (
              <div key={album.id} className='Album'>
                <h3>{album.title}</h3>
                <Button type='secondary' label='Photos' onClick={() => setSelectedAlbum(album.id === selectedAlbum ? null : album.id)} />
                {selectedAlbum === album.id && (loadingPhotos ? <div><img src={logo} className="App-logo" alt="logo" /></div> : photos.map(photo => (
                  <img key={photo.id} src={photo.thumbnailUrl} alt={photo.title} />
                )))}
              </div>
            )))}
          </div>
        ))}
      </div>
    </div>
  );
}
export default UserList;
