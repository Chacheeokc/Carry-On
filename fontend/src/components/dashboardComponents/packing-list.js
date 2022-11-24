import React, { Component, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default class PackingList extends Component {
  // old stuff
  // const [items, setItems] = useState([
  //     // { itemName: 'item 1', isSelected: false },
  //     // { itemName: 'item 2',  isSelected: true },
  //     // { itemName: 'item 3',  isSelected: false },
  //   ]);
  //   const [inputValue, setInputValue] = useState('');
  //   const handleAddButtonClick = () => {
  //     const newItem = {
  //       itemName: inputValue,
  //       isSelected: false,
  //     };
  //     const newItems = [...items, newItem];
  //     setItems(newItems);
  //     setInputValue('');
  //   };
  //   const toggleComplete = (index) => {
  //     const newItems = [...items];
  //     newItems[index].isSelected = !newItems[index].isSelected;
  //     setItems(newItems);
  //   };

  // new stuff
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      packingItems: [],
    };
    this.handlePut = this.handlePut.bind(this);
    this.handleGet = this.handleGet.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }


  handlePut(e) {
    e.preventDefault();
    const { item } = this.state;
    const username = window.localStorage.getItem('username');
    console.log(item);
    fetch("http://localhost:5000/add-packing-item", {
      method: "PUT",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        item,
        username
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
      });
  }

  handleGet(e) {
    e.preventDefault();
    const username = window.localStorage.getItem('username');
    fetch("http://localhost:5000/get-packing-items/", {
      method: "GET",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        'username': username,
      },
    }).then((res) => res.json())
      .then((data) => {
        this.setState({ packingItems: [...data] });
        console.log(this.state.packingItems);
      })
  }

  handleDelete(e){
    e.preventDefault();
    const { item } = this.state;
    const username = window.localStorage.getItem('username');
    console.log(item);
    fetch("http://localhost:5000/delete-packing-item", {
      method: "DELETE",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        item,
        username
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
      });
  }


  render() {
    return (
      <div className='app-background' >
        <div className='main-container'>
          <form className="submit-form" onSubmit={async (e) => {
            await this.handlePut(e)
            await this.handleGet(e)
            // this.setState({item: ""})
          }} >

            {/* below had param value={this.state.item} to make resting state blank after hitting submit */}
            <input onChange={(e) => this.setState({ item: e.target.value })} className='add-item-input' placeholder='Add an item...'  />
            <button className="btn btn-success" > Add </button>
          </form>
          <button className="btn btn-success" onClick={this.handleGet}> Get packing list</button>
          {this.state.packingItems.map((packingItem, idx) => (
            <div key={idx}>
               <div>{packingItem} </div>
              <button className="remove-item" onClick={async (e) => {
                await this.setState({item: packingItem});
                await this.handleDelete(e);
                await this.handleGet(e)
              }}>
                delete
              </button>
            </div>
          ))}

        </div>
      </div>
    );
  }
}

