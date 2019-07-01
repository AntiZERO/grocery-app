import React, { Component} from 'react';
import { Link } from 'react-router-dom';



class UpdateItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            newName: '',
            newQuantity: ''
        }
    }

    editItem =  async (itemId, e) => {

        e.preventDefault();

        this.setState({
            newName: e.target.value,
            newQuantity: e.target.value
        })

        const response = await fetch(`/lists/${this.props.listId}/items/${itemId}/update`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: this.state.newName, quantity: this.state.newQuantity }),
          });
        console.log("update",response);
        const body = await response.text();
        this.props.updateItem();
        this.setState({newName: "", newQuantity: ""});


    };

    render () {


        return(
            <div className="updateItem-container">
                <form className="item" onSubmit={this.editItem.bind(this, this.props.itemId)}>
                    <input type="text" name="itemName"  value={this.state.newName} onChange={e => this.setState({ newName: e.target.value})} placeholder="Update Name" />
                    <input type="text" name="quantity"  value={this.state.newQuantity} onChange={e => this.setState({ newQuantity: e.target.value})} placeholder="Update Qty" />
                    <button type="submit" className="btn btn-sml btn-warning update-btn">Update Item</button>
                </form>
            </div>
            )
            
        }
}

export default UpdateItem;