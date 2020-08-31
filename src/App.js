import React from 'react';
import './App.css';
import styled from 'styled-components';

import Block from './components/Block'

const quadBlock = [{x: 3, y: 0}, {x: 4, y: 0}, {x: 3, y: 1}, {x: 4, y: 1}]
const lineBlock = [{x: 4, y: 0}, {x: 4, y: 1}, {x: 4, y: 2}, {x: 4, y: 3}]
const tBlock = [{x: 4, y: 0}, {x: 4, y: 1}, {x: 3, y: 1}, {x: 5, y: 1}]
const zBlock = [{x: 3, y: 0}, {x: 4, y: 0}, {x: 4, y: 1}, {x: 5, y: 1}]
const sBlock = [{x: 4, y: 0}, {x: 3, y: 0}, {x: 3, y: 1}, {x: 2, y: 1}]
const rBlock = [{x: 3, y: 0}, {x: 3, y: 1}, {x: 2, y: 1}, {x: 1, y: 1}]
const backRBlock = [{x: 3, y: 0}, {x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 1}]

const blocks = [quadBlock, lineBlock, tBlock, zBlock, sBlock, rBlock, backRBlock];

class App extends React.Component {
  state = {
    matrix: new Array(24).fill(new Array(10).fill(0)),
    blockPos: lineBlock,
    score: 0
  }

  componentDidMount() {
    setInterval(() => {
      this.moveBlockDown()
    }, 500)
  }

  moveBlockDown = () => {
    const {matrix, blockPos, score} = this.state

    console.log(blockPos)
    let newScore = score
    let newMatrix = matrix.map(row => row.map(cell => cell === 2 ? cell : 0))
    let newBlockPos = blockPos.map(cellPos => ({...cellPos}))

    newBlockPos = newBlockPos.map(cellPos => {
      newMatrix[cellPos.y][cellPos.x] = 1

      if (cellPos.y >= matrix.length - 1 || newMatrix[cellPos.y + 1][cellPos.x] === 2) {
        return true
      } else {
        return {...cellPos, y: cellPos.y + 1}
      }
    })

    const floorCheck = newBlockPos.find(cell => cell === true)

    const randomBlock = Math.floor(Math.random() * 7)

    if (floorCheck) {

      newMatrix = newMatrix.map(row => row.map(cell => cell === 1 ? 2 : cell))
        .filter(row => row.includes(0))

      if (newMatrix.length < 24) {
        for (let i = 0; i <= 24 - newMatrix.length; i++) {
          newMatrix = [new Array(10).fill(0) ,...newMatrix]
          newScore += 10
        }
      }

      newBlockPos = lineBlock
    }


    this.setState({
      matrix: newMatrix,
      blockPos: newBlockPos,
      score: newScore
    })
  }

  moveBlockX = (side) => {
    const {matrix, blockPos} = this.state
    const isLeftWall = Boolean(blockPos.find(cellPos => (cellPos.x === 0) || matrix[cellPos.y][cellPos.x - 1] === 2))
    const isRightWall = Boolean(blockPos.find(cellPos => (cellPos.x === 9) || matrix[cellPos.y][cellPos.x + 1] === 2))

    if (side > 0 && isRightWall) {
      return null
    }

    if (side < 0 && isLeftWall) {
      return null
    }

    let newMatrix = matrix.map(row => row.map(cell => cell === 2 ? cell : 0))
    let newBlockPos = blockPos.map(cellPos => ({...cellPos, x: cellPos.x + side}))

    newBlockPos.forEach(cellPos => {
      newMatrix[cellPos.y][cellPos.x] = 1
    })

    this.setState({
      blockPos: newBlockPos,
      matrix: newMatrix
    })
  }

  blockControls = (e) => {
    switch(e.key) {
      case 'ArrowLeft':
        this.moveBlockX(-1)
        break
      case 'ArrowRight':
        this.moveBlockX(1)
        break
      case 'ArrowDown':
        this.moveBlockDown()
        break
      default:
        break
    }
  }

  render() {
    return (
      <StyledApp
        onKeyDown={(e) => this.blockControls(e)}
        tabIndex={0}
      >
        {
          this.state.matrix.map((row, i) => row.map((cell, index) => {
              return (
                <Block key={i * index + Math.random()} background={cell}/>
              )
          }))
        }
        <div>
          {this.state.score}
        </div>
      </StyledApp>
    );
  }
}

export default App;

const StyledApp = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #61dafb;
  width: 300px;
  height: 720px;
`
