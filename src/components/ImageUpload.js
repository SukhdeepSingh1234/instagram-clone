import { Button } from '@mui/material'
import React, { useState } from 'react'
import { db,storage } from '../firebase'
import firebase from 'firebase'

function ImageUpload({username}) {
    const [caption,setCaption]=useState('')
    const [image,setImage]=useState(null)
    const [progress,setProgress]=useState(0)
    const [url, setUrl] = useState("");
    
    const handleChange= (e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // progress function ...
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            // Error function ...
            console.log(error);
          },
          () => {
            // complete function ...
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                setUrl(url);
                // post image inside db
                db.collection("posts").add({
                  imageUrl: url,
                  caption: caption,
                  username: username,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
    
                setProgress(0);
                setCaption("");
                setImage(null);
              });
          }
        );
      };

  return (
    <div>
       <progress value={progress} max="100"/>
      <input type='text' placeholder='Enter a caption' onChange={(e)=> setCaption(e.target.value)} value={caption} />
      <input type='file' onChange={handleChange} />
      <Button onClick={handleUpload} >Upload</Button>
    </div>
  )
}

export default ImageUpload
