import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import includedFishes from "../sample-fishes";
import database from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };
  static propTypes = {
    match: PropTypes.object,
  };
  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeID);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = database.syncState(`${params.storeID}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.storeID,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    database.removeBinding(this.ref);
  }

  addFish = (fish) => {
    console.log("Adding fish !!!");
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to the variables
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. Update the state
    fishes[key] = updatedFish;
    // 3. Set the fish to staate
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    // 1. Take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. Uodate the state
    fishes[key] = null;
    // 3. Update state
    this.setState({ fishes });
  };

  loadFishes = () => {
    this.setState({ fishes: includedFishes });
  };

  addToOrder = (key) => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Either add to order or update the number in order
    order[key] = order[key] + 1 || 1;
    // 3. Set the new order to the state
    this.setState({ order });
  };

  deleteFishInOrder = (key) => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Uodate the state
    delete order[key];
    // 3. Update state
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div>
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                id={key}
                infos={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              >
                {key}
              </Fish>
            ))}
          </ul>
        </div>
        <Order
          key={Date.now()}
          fishes={this.state.fishes}
          order={this.state.order}
          deleteFishInOrder={this.deleteFishInOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadFishes={this.loadFishes}
          fishes={this.state.fishes}
          storeID={this.props.match.params.storeID}
        />
      </div>
    );
  }
}

export default App;
