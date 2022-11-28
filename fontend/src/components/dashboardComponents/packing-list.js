import React, { Component, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// import "../index.css"
import "./packing-list.css";


export default class PackingList extends Component {
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
        this.handleGet(e);
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

  handleDelete(e) {
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
        this.handleGet(e);
      });
  }


  render() {
    return (
      <div className='app-background' >
        <div className='main-container'>
          <form className="submit-form" onSubmit={async (e) => {
            await this.handlePut(e)
            this.setState({ item: "" })
          }} >
            <input onChange={(e) => this.setState({ item: e.target.value })} className='add-item-input' placeholder='Add an item...' value={this.state.item} />
            <button className="btn btn-success" > Add </button>
          </form>
          <button className="btn btn-success" onClick={this.handleGet}> Get packing list</button>
          {this.state.packingItems.map((packingItem, idx) => (
            <div key={idx}>
              <div>{packingItem} </div>
              <button className="remove-item" onClick={async (e) => {
                await this.setState({ item: packingItem });
                await this.handleDelete(e);
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

