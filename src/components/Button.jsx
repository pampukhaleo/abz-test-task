import React from "react"
//100px button
export const Button = ({ text, click, valid }) => <button disabled={valid} onClick={click} className="btn">{text}</button>
//120px button
export const LargeButton = ({ text, click, valid }) => <button disabled={valid} onClick={click} className="btn large">{text}</button>
