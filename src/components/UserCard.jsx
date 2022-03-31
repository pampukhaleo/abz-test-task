import React, {useState} from "react"

import profileCover from "../images/photo-cover.svg"

const UserCard = ({user}) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="user-card">
      <img src={user.photo ? user.photo : profileCover} alt="Profile-picture"/>
      <span style={{margin: "20px 0"}}>{user.name}</span>
      <span>{user.position}</span>
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