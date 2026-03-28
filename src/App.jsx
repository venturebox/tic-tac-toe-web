import { useState } from 'react'
import './App.css'

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function calculateWinner(squares) {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] }
    }
  }
  return null
}

function Square({ value, onClick, highlight }) {
  return (
    <button
      className={`square ${value === 'X' ? 'x' : value === 'O' ? 'o' : ''} ${highlight ? 'highlight' : ''}`}
      onClick={onClick}
    >
      {value}
    </button>
  )
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)

  const result = calculateWinner(squares)
  const winner = result?.winner
  const winningLine = result?.line ?? []
  const isDraw = !winner && squares.every(Boolean)

  function handleClick(index) {
    if (squares[index] || winner) return
    const next = squares.slice()
    next[index] = isXNext ? 'X' : 'O'
    setSquares(next)
    setIsXNext(!isXNext)
  }

  function resetGame() {
    setSquares(Array(9).fill(null))
    setIsXNext(true)
  }

  let status
  if (winner) {
    status = `Wygrał gracz: ${winner}`
  } else if (isDraw) {
    status = 'Remis!'
  } else {
    status = `Ruch gracza: ${isXNext ? 'X' : 'O'}`
  }

  return (
    <div className="app">
      <h1>Kółko i Krzyżyk</h1>
      <p className={`status ${winner ? 'winner' : isDraw ? 'draw' : ''}`}>
        {status}
      </p>
      <div className="board">
        {squares.map((val, i) => (
          <Square
            key={i}
            value={val}
            onClick={() => handleClick(i)}
            highlight={winningLine.includes(i)}
          />
        ))}
      </div>
      <button className="reset-btn" onClick={resetGame}>
        Reset gry
      </button>
    </div>
  )
}
