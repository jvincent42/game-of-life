import React from 'react'

import Cell from '../Cell'
import './Grid.css'


export const Line = ({ row, x, setStatus }) =>
  <div className="line" style={{height: '20px'}}>
    { row.map((col, i) => <Cell key={ `${x}-${i}` } x={x} y={i} alive={col} setStatus={ setStatus } />) }
  </div>


export const Grid = ({ arr, setStatus }) =>
  <div className="grid">
    { arr.map((row, i) => <Line key={i} x={i} row={row} setStatus={ setStatus } />) }
  </div>

export default Grid
