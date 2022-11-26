import React, {useEffect, useState, useRef} from 'react';
import ExpenseItem from './expense-item';
import moment from "moment";
import { set } from 'date-fns';

function ExpenseList({ income, setIncome }) {
  const [expenseItems, setExpenseItems] = useState([]);
  var deleteItem = "";
  const desc = useRef(null);
  const date = useRef(null);
  const price = useRef(null);

  const sortByDate = (a, b) => {
    return a.date - b.date;
  }

  const handlePut = e => {
    e.preventDefault();
    let d = date.current.value.split("-");
    let newD = new Date(d[0], d[1] - 1, d[2]);
    
    setIncome([...income, {
      "desc": desc.current.value,
      "price": price.current.value,
      "date": newD.getTime()
    }]);

    const username = window.localStorage.getItem('username');
    fetch("http://localhost:5000/add-expense-item", {
      method: "PUT",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        expenseItem : desc.current.value,
        price : price.current.value,
        date : date.current.value
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        handleGet(e);
      });
  }

  const handleGet = e => {
    e.preventDefault();
    const username = window.localStorage.getItem('username');
    console.log(username);
    fetch("http://localhost:5000/get-expense-items/", {
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
        setExpenseItems([...data]);
        console.log({expenseItems})
      })
  }

  const handleDelete = async e => {
    e.preventDefault();
    const expense = deleteItem;
    console.log(expense);
    const username = window.localStorage.getItem('username');
    fetch("http://localhost:5000/delete-expense-item", {
      method: "DELETE",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        item : expense,
        username
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        handleGet(e);
      });
  }

  return (
    <div>
    <form onSubmit={handlePut}>
      <div>
        <input type="text" name="desc" id="desc" placeholder="Expense Description..." ref={desc} /> 
        <input type="number" name="price" id="price" placeholder="Price..." ref={price}/>
        <input type="text" name="date" id="date" placeholder="Date of expense... (mm/dd/yy)" ref={date} />
        <br></br>
        <input type="submit" value="Add Expense" />
      </div>
    </form>

    <div className="expense-list">
      <button className="btn btn-success" onClick={async (e) =>{
        await handleGet(e)
        }}> Get expenses</button>
      {expenseItems.sort(sortByDate).map((expenseItem, idx) => (
            <div key={idx}>
               <div>{expenseItem.expenseItem} {expenseItem.price} {moment(expenseItem.date).format('MM/DD/YY')} </div>
               <button className="remove-item" onClick={async (e) => {
                deleteItem = expenseItem.expenseItem;
                await handleDelete(e);
              }}>
                delete
              </button>
            </div>
          ))}
       {/* { income.sort(sortByDate).map((value, index) => (
           <ExpenseItem 
             key={index} 
             income={value} 
             index={index} 
             removeIncome={removeIncome}
           />
         ))
       } */}
    </div>
    </div>
  )
}

export default ExpenseList;