import React from 'react'
import R, { map, identity, xprod, range, path, indexOf } from 'ramda'

import { createMatrice, fst, snd } from '../../utils'

import Grid from '../Grid'

const neighboursMatrice = xprod(range(-1, 2), range(-1, 2)).filter(x => !(fst(x) === 0 && snd(x) === 0))

const sumNeighbours = (grid, x, y) => {
  return (
    neighboursMatrice.reduce((acc, [i,j]) => {
      return path([x + i, y + j], grid) ? acc + 1 : acc
    }, 0)
  )
}

const getCellState = (grid, x, y) => {
  const neighbours = sumNeighbours(grid, x, y)
  return !grid[x][y]
    ? neighbours === 3 ? true : false
    : indexOf(neighbours, [2,3]) > -1 ? true : false
}

const initialGrid = () => {
  const grid = createMatrice(30)(30)(false)
  grid[1][1] = true
  grid[1][2] = true
  grid[1][3] = true
  grid[10][10] = true
  grid[10][11] = true
  grid[10][12] = true
  return grid;
}

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

  updateState = (state) => {
    if (!state.pause) {
      const applyLife = grid => grid.map((r,x) => r.map((c,y) => getCellState(grid, x, y)))
      const newGrid = applyLife(state.grid)
      this.setState({ grid: newGrid })
    }
  }

  setStatus = (x, y) => {
    const mutGrid = this.state.grid
    mutGrid[x][y] = !mutGrid[x][y]
    this.setState({
      grid: mutGrid
    })
  }

  setPause = () => {
    this.setState({
      pause: !this.state.pause
    })
  }

  renderLoop = () => {
    this.updateState(this.state)
    setTimeout(this.renderLoop, 100)
  }

  render() {
    return (
      <div>
        <Grid arr={ this.state.grid } setStatus={ this.setStatus } />
        <button onClick={ this.setPause }>Pause</button>
      </div>
    )
  }
}

export default App
