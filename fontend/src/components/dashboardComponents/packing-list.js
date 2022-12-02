import React, { Component } from "react";
import "./packing-list.css";

// Packing List component
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

  // get packing list on render
  componentDidMount() {
    this.handleGet();
  }

  // client-side add packing item
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

    // client-side get packing items
  handleGet(e) {
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

    // client-side delete packing item
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

  // HTML for packing list
  render() {
    return (
      <div className='app-background' >
        <div className='main-container'>
          <form className="submit-form" onSubmit={async (e) => {
            await this.handlePut(e)
            this.setState({ item: "" })
          }} >
            <label>
              <input type="text" onChange={(e) => this.setState({ item: e.target.value })} className='add-item-input' placeholder='Add an item...' />
              <button className="add-button" > Add </button>
            </label>
            <br></br>

          </form>
          {this.state.packingItems.map((packingItem, idx) => (
            <div key={idx}>
              <span className='d-flex align-items-center'>

                <input type='checkbox' id="cbox2" value="second_checkbox" /> <label for="cbox2">

                  <div className="list-item">{packingItem}</div>
                  <button className="remove-button" onClick={async (e) => {
                    await this.setState({ item: packingItem });
                    await this.handleDelete(e);
                  }}>
                    X
                  </button>
                </label>
              </span>
              <br></br>
            </div>
          ))}
        </div>
      </div>
    );
  }
}