import React from 'react'

interface UserInformationProps {
  username: string;
  image?: string;
}

export default function User({ username, image }:UserInformationProps) {
  return (
    <div className='user'>
      {image && <img src={image}/>}
      <p>{username}</p>
    </div>
  )
}
