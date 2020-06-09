import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  storeInput = React.createRef();
  static propTypes = {
    history: PropTypes.object,
  };
  goToStore = (e) => {
    // 1. Stop the form from submitting
    e.preventDefault();
    // 2. Get value from input
    const storeName = this.storeInput.current.value;
    // 3. Change the next page
    this.props.history.push(`/store/${storeName}`);
  };

  // Function run when all the react components are rendered in page
  //   componentDidMount() {
  //     console.log("Mounted !!!");
  //   }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2> Please enter a store</h2>
        <input
          type="text"
          ref={this.storeInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit"> Visit store </button>
      </form>
    );
  }
}

export default StorePicker;
