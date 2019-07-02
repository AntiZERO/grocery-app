import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/lists.css';

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      listName: ''
    }


  }

  componentDidMount() {
    this.getAllLists()
      .then(res => this.setState({ lists: res.lists }))
      .catch(err => console.log(err));
  };

  getAllLists = async () => {
    const response = await fetch('/lists/all');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("getAllLists", body.lists);
    return body;
  };

  onSubmit = async e => {

    e.preventDefault();
    const response = await fetch('/lists/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.listName }),
    });
    console.log(response);
    const body = await response.text();
    this.getAllLists()
      .then(res => this.setState({ lists: res.lists }))
      .catch(err => console.log(err));


    this.setState({ listName: '' });
  };





  render() {

    return (
      <div className="container-lists col-lg-8 offset-lg-2">
        <h4 className="lists-header"> Your Grocery Lists: </h4>
        <div className="lists">
          {
            this.state.lists.map((list, index) =>
              <Link to={`/lists/${list.id}`} key={index} className="list-link">
                <p className="list-name">{list.name}</p>
              </Link>
            )
          }
        </div>
        <div className="newList">
          <form className="newListForm" onSubmit={this.onSubmit}>
            <input
              type="text"
              name="title"
              className="new-title-form"
              value={this.state.listName}
              onChange={(e) => this.setState({ listName: e.target.value })}
              placeholder="New List Tame">
            </input>
            <button type="submit" className="btn btn-success"> Add List</button>
          </form>
        </div>

      </div>
    )
  }
}

export default Lists;
