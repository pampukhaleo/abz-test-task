import React, { useEffect, useState } from "react"
import { getUsers } from "../api"
import { LargeButton } from "./Button"
import UserCard from "./UserCard"
import Preloader from "./Preloader"

//Users list component
const UsersList = ({ count, isUpdate, onChange }) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])

  // Show 12 more Users on Show more button click
  const handleClick = () => {
    onChange((prevValue) => prevValue + 12)
  }

  useEffect(() => {
    getUsers(count) // Fetching users data
      .then(res => {
        setIsLoaded(true)
        setItems(res)
      })
      .catch(error => {
        setIsLoaded(true)
        setError(error)
      })
  }, [count, isUpdate])

  if (error) { // Show Preloader component with message on error state
    return (
      <div className="users-list loaded">
        <div className="users-list-title">Server Error</div>
        <Preloader />
      </div>
    )
  } else if (!isLoaded) { // Show Preloader component with message on isLoaded state
    return (
      <div className="users-list loaded">
        <div className="users-list-title">Loading</div>
        <Preloader />
      </div>
    )
  } else {
    return (
      <div className={ isLoaded ? "users-list loaded" : "users-list" }>
        <div className="users-list-title">Working with GET request</div>
        {/* Show loaded Users */}
        <div className="users-items">
          {items.length > 0
            ? items.map(item => (
              <div className="user-item" key={item.id}>
                <UserCard user={item} />
              </div>
            ))
            : null}
        </div>
        <div className="user-list-btn">
          {count > items.length
            ? null
            : <LargeButton click={handleClick} text="Show more" /> }
        </div>
      </div>
    )
  }
}

export default UsersList