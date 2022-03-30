import React from "react"

const Button = ({ text, click }) => <button onClick={click} className="btn">{text}</button>

export default Button