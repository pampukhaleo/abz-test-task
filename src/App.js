import React, {useState} from 'react'
import Header from "./components/Header"
import MainBlock from "./components/MainBlock"
import UsersList from "./components/UsersList"
import SignUpForm from "./components/SignUpForm"

const App = () => {
  const [count, setCount] = useState(6) //Users pagination count
  const [isUpdate, setIsUpdate] = useState(false) //Users list update on registration
  const onSubmit = () => count === 6 ? setIsUpdate(!isUpdate) : setCount(6) //Users list update with "Show more" button active

  return (
    <div>
      <Header/>
      <MainBlock/>
      <UsersList
        count={count}
        isUpdate={isUpdate}
        onChange={setCount}
      />
      <SignUpForm onSubmit={onSubmit}/>
    </div>
  )
}

export default App