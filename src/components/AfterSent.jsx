import React from 'react'
import successImg from "../images/success-image.svg"

const AfterSent = () => (
  <div className="after-start">
    <div className="after-start-text">User successfully registered</div>
    <div className="after-start-image">
      <img src={successImg} alt="User successfully registered"/>
    </div>
  </div>
)

export default AfterSent;