import * as React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/Posts';
import {db,auth} from './firebase';
import {Button,Input,Box,Typography,Modal,Avatar } from '@mui/material';
import ImageUpload from './components/ImageUpload';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleRegisterOpen = () => setRegisterOpen(true);

  const [posts,setPosts]=useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerOpen, setRegisterOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in...
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          // dont update username
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc => ({
        id:doc.id, // getting the id of the particular post
        post:doc.data()
      })))
    })
  },[]);
  const handleLogin = (e) => {
    e.preventDefault();
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));

    setOpen(false);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setRegisterOpen(false);
  };

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form className="app__login">
            <center>
              <img
                className="app__headerImage"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
                alt=""
              />
            </center>

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>Login</Button>
          </form>
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form className="app__login">
            <center>
              <img
                className="app__headerImage"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
                alt=""
              />
            </center>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleRegister}>Register</Button>
          </form>
          </Typography>
        </Box>
      </Modal>
      

       <div className="app__header">
        <img
          className="app__headerImage"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
          alt=""
        />
        {user?.displayName ? (
          <div className="app__headerRight">
            <Button onClick={() => auth.signOut()}>Logout</Button>
            <Avatar
              className="app__headerAvatar"
              alt={user.displayName}
              src="/static/images/avatar/1.jpg"
            />
          </div>
        ) : (
          <form className="app__loginHome">
            <Button onClick={() => setOpen(true)}>Login</Button>
            <Button onClick={() => setRegisterOpen(true)}>Sign Up</Button>
          </form>
        )}
        </div>
        {/* <Button onClick={handleOpen}>Login</Button>
        <Button onClick={handleRegisterOpen}>Register</Button> */}
        {
          posts.map(({id,post})=>(
            // key helps in not re-rendering the post or the data if as it knows that the particular id is added then it dont refreshes the whole list rather it knows whih post is created and render only that it is good for efficiency
            <Posts key={id} icon={post.icon} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          ))
        }
        {user?.displayName?( // note there are double checks in a single ternary operator condition to firstly chech if the user exists if yes then get the display name after the render image Upload
        <ImageUpload username={user.displayName} />
        ):(
          <h3>Login to Upload Posts</h3>
        )}
      
    </div>
  );
}

export default App;
