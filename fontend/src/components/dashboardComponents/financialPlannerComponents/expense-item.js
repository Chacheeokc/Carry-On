import React from 'react';

function ExpenseItem({income, index, removeIncome}) {
  let date = new Date(income.date);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const removeHandle = i => {
    removeIncome(i);
  }

  return (
    <div className="expense-item">
      <button className="remove-item" onClick={() => removeHandle(index)}>x</button>
      <div className="desc">{income.desc}</div>
      <div className="price">${income.price}</div>
      <div className="date">{day + "/" + month + "/" + year}</div>
    </div>
  )
}

export default ExpenseItem;