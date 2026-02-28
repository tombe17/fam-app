import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <p>
          Welcome to the family website! (Still some work to be done.) Currently this page will function as a family cookbook!
        </p>
      </div>
      <h1>Bellows Cookbook</h1>
      <div className="button-row">
        <button className="button">
          Add Recipe
        </button>
        <button className="button">
          Search Recipes
        </button>
        <button className="button">
          Browse All
        </button>
    </div>
    </>
  )
}

export default App
