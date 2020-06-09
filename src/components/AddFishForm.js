import React from "react";
import PropTypes from "prop-types";

class AddFishForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  descRef = React.createRef();
  statusRef = React.createRef();
  imageRef = React.createRef();

  static propTypes = {
    addFish: PropTypes.func,
  };

  createFish = (e) => {
    e.preventDefault();
    const fishInfo = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      desc: this.descRef.current.value,
      status: this.statusRef.current.value,
      image: this.imageRef.current.value,
    };
    // console.log(fishInfo);
    this.props.addFish(fishInfo);
    // Clear the component
    e.currentTarget.reset();
  };
  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
        <input
          name="price"
          ref={this.priceRef}
          type="number"
          step="0.01"
          min="0"
          placeholder="Price"
        />
        <select
          name="status"
          ref={this.statusRef}
          type="text"
          placeholder="Status"
        >
          <option value="available">Fresh</option>
          <option value="unavailable">Sold out</option>
        </select>
        <textarea
          name="desc"
          ref={this.descRef}
          type="textarea"
          placeholder="Description"
        />
        <input
          name="image"
          ref={this.imageRef}
          type="text"
          placeholder="Image"
        />
        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;
