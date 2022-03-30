import React from "react"

import profileCover from "../images/photo-cover.svg"

const UserCard = ({user}) => (
  <div className="user-card">
    <img src={user.photo ? user.photo : profileCover} alt="Profile-picture"/>
    <span style={{margin: "20px 0"}}>{user.name}</span>
    <span>{user.position}</span>
    <span>{user.email}</span>
    <span>{user.phone}</span>
  </div>
)

export default UserCard