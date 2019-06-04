import React from 'react'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'

class App extends React.Component {
  // Ways to add state
  // 1. Contructor
  // constructor() {
  //   super()
  //   this.state = {}
  // }
  // 2. Properties

  state = {
    fishes: {},
    order: {}
  }

  addFish = fish => {
    // How to update state
    // 1. Take a copy of the existing state (avoids mutation of state)
    const fishes = { ...this.state.fishes }

    // 2. Add new fish to fishes variable
    fishes[`fish${Date.now()}`] = fish

    // 3. Set new fishes obj to state
    this.setState({ fishes })
  }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    )
  }
}

export default App
