import React, {useState} from 'react'
import Header from "./components/Header"
import MainBlock from "./components/MainBlock"
import UsersList from "./components/UsersList"
import SignUpForm from "./components/SignUpForm"

const App = () => {
  const [count, setCount] = useState(6)
  const onSubmit = () => setCount(6)

  return (
    <div>
      <Header/>
      <MainBlock/>
      <UsersList
        count={count}
        onChange={setCount}
      />
      <SignUpForm onSubmit={onSubmit}/>
    </div>
  )
}

export default App