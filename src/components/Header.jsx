import React from "react"
import logo from "../images/Logo.svg"
import { Button } from "./Button"

const Header = () => (
  <div className="header">
    <div className="header-container">
      <div className="header-logo">
        <img src={logo} alt="Logo"/>
      </div>
      <div className="header-navigation">
        <Button text="Users"/>
        <Button text="Sign up"/>
      </div>
    </div>
  </div>
)

export default Header