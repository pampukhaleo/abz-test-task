import React from "react"
import successImg from "../images/success-image.svg"

// Successfully registered component
const AfterSent = () => (
  <div className="after-sent">
    <div className="after-sent-text">User successfully registered</div>
    <div>
      <img src={successImg} alt="User successfully registered" />
    </div>
  </div>
)

export default AfterSent;