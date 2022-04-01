import React from "react"
import {Button} from "./Button"

const MainBlock = () => (
  <div className="main-block-container">
    <div className="main-block">
      <h1 className="main-block-title">Test assignment for front-end developer</h1>
      <p className="main-block-text">What defines a good front-end developer is one that has skilled knowledge of HTML,
        CSS, JS with a vast
        understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They
        should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
      <Button text="Sign up"/>
    </div>
  </div>
)

export default MainBlock