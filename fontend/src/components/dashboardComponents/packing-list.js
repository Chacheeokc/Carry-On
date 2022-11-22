import React, { Component, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

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
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
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
  render() {
    return (
      <div className='app-background'>
        <div className='main-container'>
          <form className="submit-form" onSubmit={this.handleSubmit} >
            <input onChange={(e) => this.setState({item: e.target.value})} className='add-item-input' placeholder='Add an item...' />
            {/* used to be onClick={() => handleAddButtonClick()} */}
            {/* <FontAwesomeIcon icon={faPlus} onSubmit={this.handleClick} /> */}
            <button className="btn btn-success" > here</button>
          </form>
          <div className='item-list'>
            {/* {items.map((item, index) => (
              <div className='item-container'>
                <div className='item-name' onClick={() => toggleComplete(index)}>
                  {item.isSelected ? (
                    <>
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <span className='completed'> {item.itemName}</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCircle} />
                      <span> {item.itemName}</span>
                    </>
                  )}

                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    );
  }
}

