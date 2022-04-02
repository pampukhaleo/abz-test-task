import React, { useState } from "react"
import profileCover from "../images/photo-cover.svg"

//User data component
const UserCard = ({user}) => {
  const [isShown, setIsShown] = useState(false)

  return (
    <div className="user-card">
      <img src={user.photo ? user.photo : profileCover} alt="Profile-picture"/>
      <span className="user-card-name">{user.name}</span>
      <span>{user.position}</span>
      {/* Email tooltip component appears on User email hover*/}
      <span onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}>
        {user.email}
      </span>
      {isShown && (
        <div className="show-email">
          <span className="show-email-text">{user.email}</span>
        </div>
      )}
      <span>{user.phone}</span>
    </div>
  )
}

export default UserCard