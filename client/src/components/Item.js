import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import UpdateItem from './UpdateItem.js';

import './styles/item.css';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      name: '',
      quantity: '',
      purchased: false,
      newDescription: '',
    }
    
  }

  componentDidMount() {
    this.getItems()
      .then(res => this.setState({ items: res.items }))
      .catch(err => console.log(err));

  };

  componentWillUpdate() {
    this.getItems()
      .then(res => this.setState({ items: res.items }))
      .catch(err => console.log(err));
  }

  getItems = async () => {
    const response = await fetch(`/lists/${this.props.listId}/items/all`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("getItems", body.items);
    return body;
  };

  updateItem = () => {
    this.getItems()
      .then(res => this.setState({ items: res.items }))
      .catch(err => console.log(err));

  }

  onSubmit = async e => {

    e.preventDefault();
    const response = await fetch(`/lists/${this.props.listId}/items/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.name, quantity: this.state.quantity, purchased: this.state.purchased }),
    });
    console.log(response);
    const body = await response.text();
    this.getItems()
      .then(res => this.setState({ items: res.items }))
      .catch(err => console.log(err));

    this.setState({ name: '' });
  };

  purchasedItem = async (itemId, e) => {

    e.preventDefault();

    const response = await fetch(`/lists/${this.props.listId}/items/${itemId}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ purchased: true }),
    });
    console.log("purchased", response);
    const body = await response.text();
    this.getItems()
      .then(res => this.setState({ items: res.items }))
      .catch(err => console.log(err));
  };

  unpurchasedItem = async (itemId, e) => {

    e.preventDefault();

    const response = await fetch(`/lists/${this.props.listId}/items/${itemId}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ purchased: false }),
    });
    console.log("unpurchased", response);
    const body = await response.text();
    this.getItems()
      .then(res => this.setState({ items: res.items }))
      .catch(err => console.log(err));
  };

  deleteItem = async (itemId, e) => {

    e.preventDefault();

    const response = await fetch(`/lists/${this.props.listId}/items/${itemId}/destroy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("destroy", response);
    const body = await response.text();
    this.getItems()
      .then(res => this.setState({ items: res.items }))
      .catch(err => console.log(err));
  };


  render() {

    return (
      <div className="container">
        <h4>Items</h4>
        <div className="container-item">
          {
            this.state.items.map((item, index) =>
              <div className="row item" key={index}>
                <p className="item col-md-4" id="item-details" key={index}>
                <strong>Item Name:</strong> {item.name}
                <div></div>
                <strong>How Many We Need:</strong> {item.quantity}
                </p>
                <UpdateItem updateItem={this.updateItem} itemId={item.id} />
                {(
                  item.purchased ?
                    <button className="btn btn-sml btn-secondary item unpurchase-btn col-md-2" type="button" onClick={this.unpurchasedItem.bind(this, item.id)} value="Unmark as Purchased">Remove from Cart</button> :
                    <button className="btn btn-sml btn-primary item purchase-btn col-md-2" type="button" onClick={this.purchasedItem.bind(this, item.id)} value="Mark as Purchased">Put In Cart</button>
                )}
                  
                <button className="btn btn-sml btn-danger item delete-btn col-md-2" type="button" onClick={this.deleteItem.bind(this, item.id)} value="Delete Item">Delete Item</button>

              </div>
            )
          }
        </div>
        <div className="newItem">
          <form className="newItemForm" onSubmit={this.onSubmit}>
            <input
              type="text"
              name="name"
              size="40"
              className="new-item-input"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
              placeholder="Item Name">
            </input>
            <input
              type="integer"
              name="quantity"
              size="40"
              className="new-item-input"
              value={this.state.quantity}
              onChange={(e) => this.setState({ quantity: e.target.value })}
              placeholder="Item Qty">
            </input>
            <button type="submit" className="btn btn-sml btn-success add-btn"> Add Item</button>
          </form>
        </div>

      </div>
    )
  }
}

export default Item;