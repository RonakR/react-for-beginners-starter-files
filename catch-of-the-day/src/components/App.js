import React from 'react'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'
import base from '../base'

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

  componentDidMount() {
    const { params } = this.props.match
    // 1. Reinstate the localStorage
    const localStorageRef = localStorage.getItem(params.storeId)

    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    )
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
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

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes }
    // 2. Update that fish
    fishes[key] = updatedFish
    // 3. Set the new fishes object to state
    this.setState({ fishes })
  }

  loadSampleFish = () => {
    this.setState({ fishes: sampleFishes })
  }

  addToOrder = key => {
    // 1. Take a copy of state
    const order = { ...this.state.order }
    // 2. Add to order, or update order
    order[key] = order[key] + 1 || 1
    // 3. Call setState to update our state object
    this.setState({ order })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          loadSampleFish={this.loadSampleFish}
          addFish={this.addFish}
          updateFish={this.updateFish}
          fishes={this.state.fishes}
        />
      </div>
    )
  }
}

export default App
