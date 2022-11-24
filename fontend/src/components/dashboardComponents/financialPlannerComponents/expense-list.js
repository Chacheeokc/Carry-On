import React, {useEffect, useState} from 'react';
import ExpenseItem from './expense-item';
import moment from "moment";

function ExpenseList({ income, setIncome }) {

  const [expenseItems, setExpenseItems] = useState([]);

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

  return (
    <div className="expense-list">
      <button className="btn btn-success" onClick={handleGet}> Get expenses</button>
      {expenseItems.sort(sortByDate).map((expenseItem, idx) => (
            <div key={idx}>
               <div>{expenseItem.expenseItem} {expenseItem.price} {moment(expenseItem.date).format('MM/DD/YY')} </div>
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