import React from "react";
import firebase from "firebase";
import PropTypes from "prop-types";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    deleteFish: PropTypes.func,
    updateFish: PropTypes.func,
    loadFishes: PropTypes.func,
  };

  state = {
    uid: null,
    owner: null,
  };

  authenticate = (provider) => {
    console.log(provider);
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  authHandler = async (authData) => {
    console.log(authData);
    // 1. Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeID, { context: this });
    console.log(store);
    // 2. Claim it if there is no owner
    if (!store.owner) {
      console.log("not owner");
      // save it as our own
      await base.post(`${this.props.storeID}/owner`, {
        data: authData.user.uid,
      });
    }
    // 3. Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };

  logout = async () => {
    console.log("Logged out");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out !</button>;

    // 1. Check if they are logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    // 2. Chekc if they are owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          {" "}
          <p> Sorry You are not the owner</p>
          {logout}
        </div>
      );
    }
    // 3. They must be the owner just render the inventory
    return (
      <div className="inventory">
        <h2> Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map((key) => (
          <EditFishForm
            key={key}
            id={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadFishes}>Load Included Fishes</button>
      </div>
    );
  }
}

export default Inventory;
