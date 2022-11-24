import React, {useRef} from 'react';

function ExpenseForm({ income, setIncome }) {
  const desc = useRef(null);
  const date = useRef(null);
  const price = useRef(null);

  // add expense item to list
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
      });
  }

  return (

    <form onSubmit={handlePut}>
      <div>
        <input type="text" name="desc" id="desc" placeholder="Expense Description..." ref={desc} /> 
        <input type="number" name="price" id="price" placeholder="Price..." ref={price}/>
        <input type="date" name="date" id="date" placeholder="Date of expense..." ref={date} />
        <br></br>
        <input type="submit" value="Add Expense" />
      </div>
    </form>
  )
}

export default ExpenseForm;