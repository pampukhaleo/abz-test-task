import React from "react"

const Button = ({ text, click, valid }) => <button disabled={valid} onClick={click} className="btn">{text}</button>

export default Button