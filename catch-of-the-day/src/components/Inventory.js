import React from 'react'
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'
import Login from './Login'
import firebase from 'firebase'
import base, { firebaseApp } from '../base'

class Inventory extends React.Component {
  state = {
    uid: null,
    owner: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user })
      }
    })
  }
  authHandler = async authData => {
    // Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this })
    console.log(store)
    // Claim it if there is no owner
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    // Set the state of the inventory component to reflect current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
    console.log(authData)
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
  }

  logout = async () => {
    console.log('logging out')
    await firebase.auth().signOut()
    this.setState({ uid: null })
  }
  render() {
    const logout = <button onClick={this.logout}>Logout</button>

    //1. Check if they are logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />
    }
    // 2. Check if they are not the owner of th store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner</p>
          {logout}
        </div>
      )
    }
    // 3. They must be the owner, render inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFish}>Load Sample Fish</button>
      </div>
    )
  }
}

export default Inventory
