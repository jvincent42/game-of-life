import React from 'react'

import "./Cell.css"

const Cell = ({ x, y, alive, setStatus }) => {
  return (
    <div
      onClick={ () => setStatus(x, y) }
      className={ alive ? "cell alive" : "cell dead" }
    />
  )
}

export default Cell
