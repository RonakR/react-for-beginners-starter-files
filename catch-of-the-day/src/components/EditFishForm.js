import React from 'react'

class EditFishForm extends React.Component {
  handleChange = event => {
    // Update that fish
    // 1. Take a copy of the current fish
    // 2. Update what has changed using the 'name' attribute
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value
    }
    this.props.updateFish(this.props.index, updatedFish)
  }
  render() {
    const { name, price, status, desc, image } = this.props.fish
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="price"
          value={price}
          onChange={this.handleChange}
        />
        <select
          type="text"
          name="status"
          value={status}
          onChange={this.handleChange}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" value={desc} onChange={this.handleChange} />
        <input
          type="text"
          name="image"
          value={image}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default EditFishForm
