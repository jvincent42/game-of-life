import React from 'react'
import R, { xprod, range, path, indexOf, assocPath, not, reduce } from 'ramda'

import { createMatrice, fst, snd, xyLens } from '../../utils'

import Grid from '../Grid'

// Game utils

const neighboursMatrice = xprod(range(-1, 2), range(-1, 2))
                          .filter(x => !(fst(x) === 0 && snd(x) === 0))

const sumNeighbours = (grid, x, y) =>
  reduce((acc, [i,j]) =>
    path([x + i, y + j], grid) ? acc + 1 : acc
  , 0, neighboursMatrice)

const getCellState = (grid, x, y) => {
  // The two rules of the game of life are :
  // - if cell is dead and has exactly 3 neighbours, it reborns and come alive, else it stay dead
  // - if cell is alive and has 2 or 3 neighbours, it dies, else it stay alive
  const neighbours = sumNeighbours(grid, x, y)
  return !grid[x][y]
    ? neighbours === 3 ? true : false
    : indexOf(neighbours, [2,3]) > -1 ? true : false
}
/* Apply rules to all cells of a matrice */
const applyLife = matrice => matrice.map((row, x) => row.map((c, y) => getCellState(matrice, x, y)))

// Initial Game state

const initialGrid = () => {
  const grid = createMatrice(30)(80)(false)
  grid[1][1] = true
  grid[1][2] = true
  grid[0][2] = true
  grid[2][2] = true
  grid[1][3] = true
  grid[10][10] = true
  grid[10][11] = true
  grid[9][11] = true
  grid[11][11] = true
  grid[10][12] = true
  return grid;
}

// Game component

class App extends React.Component {

  state = { grid: [] }

  componentWillMount() {
    this.setState({
      grid: initialGrid()
    })
  }

  componentDidMount() {
    this.renderLoop()
  }

  setStatus = (x, y) => {
    this.setState({
      grid: R.over(xyLens(x, y), not, this.state.grid)
    })
  }

  setPause = () => {
    this.setState({
      pause: !this.state.pause
    })
  }

  updateState = (state) => {
    if (!state.pause) {
      this.setState({
        grid: applyLife(state.grid)
      })
    }
  }

  renderLoop = () => {
    this.updateState(this.state)
    setTimeout(this.renderLoop, 100)
  }

  render() {
    return (
      <div>
        <Grid arr={ this.state.grid } setStatus={ this.setStatus } />
        <button onClick={ this.setPause }>{ this.state.pause ? "Live" : "Pause" }</button>
      </div>
    )
  }
}

export default App
