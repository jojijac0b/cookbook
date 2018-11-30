import React, { Component } from 'react'
import './App.css'
import Recipes from './components/Recipes'
import ToggleableAddButton from './components/ToggleableAddButton'


const App = () => (
  <div>
    <header className="container">
      <h1>CookBook</h1>
    </header>
    <hr/>
    <div className="row main-content">
        <div className='recipes col l8 m8'>
          <h5>Recipes</h5>
          <Recipes />
        </div>
        <div className="col l4 m4">
          <div className='addButton'>
            <h5>Add Recipe</h5>
            <ToggleableAddButton />
          </div>
        </div>
    </div>
  </div>
)

export default App
