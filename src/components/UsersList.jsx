import React, {useEffect, useState} from "react"
import UserCard from "./UserCard"
import Button from "./Button"
import {getUsers} from "../api"
import Preloader from "./Preloader";

const UsersList = ({count, onChange}) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])

  const handleClick = () => {
    onChange((prevValue) => prevValue + 12)
  }

  useEffect(() => {
    getUsers(count)
      .then(res => {
        setIsLoaded(true)
        setItems(res)
      })
      .catch(error => {
        setIsLoaded(true)
        setError(error)
      })
  }, [count])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return (
      <div className="users-list loaded">
        <div className="users-list-title">Working with GET request</div>
        <Preloader />
      </div>
    )
  } else {
    return (
      <div className={ isLoaded ? "users-list loaded" : "users-list" }>
        <div className="users-list-title">Working with GET request</div>
        <div className="users-items">
          {items.length > 0
            ? items.map(item => (
              <div className="user-item" key={item.id}>
                <UserCard user={item} />
              </div>
            ))
            : null}
        </div>
        <div style={{marginTop: "50px"}}>
          {count > items.length
            ? null
            : <Button click={handleClick} text="Show More" />}
        </div>
      </div>
    )
  }
}

export default UsersList