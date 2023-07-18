import React from 'react'
import "../styles/Posts.css"
import Avatar from '@mui/material/Avatar';
function Posts({username,caption,imageUrl,icon}) {
  return (
    <div className='post'>
      <div className='post_header'>
        <Avatar className='post_avatar' alt={username} src={icon} />
        <h3>{username}</h3>
      </div>

      <img className='post_image' src={imageUrl} alt=""/>
      <p className='post_text' ><strong>{username}:</strong> {caption}</p>
    </div>
  )
}

export default Posts;
