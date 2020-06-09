import React from "react";
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      desc: PropTypes.string,
      status: PropTypes.string,
    }),
    id: PropTypes.string,
    updateFish: PropTypes.func,
  };

  handleChange = (e) => {
    console.log(e.currentTarget);
    //Update the fish info
    // 1. Take a copy of current fish
    const updatedFish = {
      ...this.props.fish,
      [e.currentTarget.name]: e.currentTarget.value,
    };
    this.props.updateFish(this.props.id, updatedFish);
  };
  render() {
    return (
      <form className="fish-edit">
        <input
          name="name"
          type="text"
          onChange={this.handleChange}
          value={this.props.fish.name}
        />
        <input
          name="price"
          ref={this.priceRef}
          type="number"
          onChange={this.handleChange}
          value={this.props.fish.price}
        />
        <select
          name="status"
          type="text"
          onChange={this.handleChange}
          value={this.props.fish.status}
        >
          <option value="available">Fresh</option>
          <option value="unavailable">Sold out</option>
        </select>
        <textarea
          name="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
        />
        <input
          name="image"
          type="text"
          onChange={this.handleChange}
          value={this.props.fish.image}
        />
        <button onClick={() => this.props.deleteFish(this.props.id)}>
          Remove Fish
        </button>
      </form>
    );
  }
}

export default EditFishForm;
