import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Item from "./Item.js";

import './styles/list.css';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      redirect: false,
      newTitle: ''
    }


  }

  componentDidMount() {
    this.getList()
      .then(res => this.setState({ list: res.list }))
      .catch(err => console.log(err));
  };

  componentWillUpdate() {
    this.getList()
      .then(res => this.setState({ list: res.list }))
      .catch(err => console.log(err));
  };

  getList = async () => {
    const response = await fetch(`/lists/${this.props.match.params.id}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("list", body);
    return body;
    this.forceUpdate();
  };

  onDelete = async e => {

    e.preventDefault();
    const response = await fetch(`/lists/${this.props.match.params.id}/destroy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("delete", response);
    const body = await response.text();
    this.setState({ redirect: true });

  };

  editTitle = async e => {

    e.preventDefault();
    const response = await fetch(`/lists/${this.props.match.params.id}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.newTitle }),
    });
    console.log("update", response);
    const body = await response.text();
    console.log("update body", body);
    this.setState({ newTitle: "" });
    this.getList()
      .then(res => this.setState({ list: res.list }))
      .catch(err => console.log(err));
  };





  render() {

    if (this.state.redirect) {
      return <Redirect to='/lists/' />
    }

    console.log(this.state.list)

    return (
      <div className="list-container">

        <div className="col1">
          <h3 className="header">{this.state.list.name}</h3>
          <div>
            <form className="list-form" onSubmit={this.editTitle}>
              <input type="text" name="title" value={this.state.newTitle} onChange={e => this.setState({ newTitle: e.target.value })} placeholder="New Title" />
              <button type="submit" className="btn btn-warning edit-button">Edit List Title</button>
            </form>
          </div>
          <div className="delete-button">
            <form className="list-form" onSubmit={this.onDelete}>
              <button type="submit" className="btn btn-danger delete-button">Delete List</button>
            </form>
          </div>

        </div>
        <div className="col2">
          <Item listId={this.props.match.params.id} />
        </div>
      </div>
    )
  }
}

export default List;