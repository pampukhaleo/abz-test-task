import React from "react"

export const Button = ({ text, click, valid }) => <button disabled={valid} onClick={click} className="btn">{text}</button>

export const LargeButton = ({ text, click, valid }) => <button disabled={valid} onClick={click} className="btn large">{text}</button>
