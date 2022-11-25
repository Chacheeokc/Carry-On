import React, {useEffect, useState} from 'react';
import ExpenseItem from './expense-item';
import moment from "moment";
import { set } from 'date-fns';

function ExpenseList({ income, setIncome }) {
  const [expenseItems, setExpenseItems] = useState([]);
  // const [item, setItem] = ({expenseItem : "", price: 0, date: ""})


  const removeIncome = i => {
    let temp = income.filter((v, index) => index != i);
    setIncome(temp);
  }

  const sortByDate = (a, b) => {
    return a.date - b.date;
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
        setExpenseItems([...expenseItems, ...data]);
        console.log({expenseItems})
      })
  }

  const handleDelete = e => {
    e.preventDefault();
    const { item } = item.expenseItem;
    const username = window.localStorage.getItem('username');
    console.log(item);
    fetch("http://localhost:5000/delete-expense-item", {
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
        // handleGet(e);
      });
  }

  return (
    <div className="expense-list">
      <button className="btn btn-success" onClick={async (e) =>{
        await handleGet(e)
        }}> Get expenses</button>
      {expenseItems.sort(sortByDate).map((expenseItem, idx) => (
            <div key={idx}>
               <div>{expenseItem.expenseItem} {expenseItem.price} {moment(expenseItem.date).format('MM/DD/YY')} </div>
               <button className="remove-item" onClick={async (e) => {
                // await setItem({...item, expenseItem : expenseItem.expenseItem})
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
  )
}

export default ExpenseList;