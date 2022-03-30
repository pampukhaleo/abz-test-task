import React, {useState} from 'react'
import Header from "./components/Header.component"
import MainBlock from "./components/MainBlock.component"
import UsersList from "./components/UsersList.component"
import SignUpForm from "./components/SignUpForm.component"

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