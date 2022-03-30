import React from "react"
import logo from "../images/Logo.svg"
import Button from "./Button"

const Header = () => (
  <div className="header">
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo"/>
      </div>
      <div className="navigation">
        <Button text="Users"/>
        <Button text="Sign Up"/>
      </div>
    </div>
  </div>
)

export default Header