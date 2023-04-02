import React from 'react'
import './Button.css'

function Button({text, onClickFunc, type='button', disabled=false}) {
  return (
    <button type={type} disabled={disabled} onClick={onClickFunc}>
        {text}
    </button>
  )
}

export default Button
