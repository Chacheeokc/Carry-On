import React, {useState, useRef, useEffect} from 'react';
import "./expense-list.css"

function ExpenseList() {
  const [expenseItems, setExpenseItems] = useState([]);
  const [expense, setExpense] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  var deleteItem = "";
  var deleteItemPrice = 0;
  const desc = useRef(null);
  const price = useRef(null);

  useEffect(() => {
    let ignore = false;
    
    if (!ignore)  handleGet();
    return () => { ignore = true; }
    },[]);

  const handlePut = e => {
    e.preventDefault();
    
    setExpense([...expense, {
      "desc": desc.current.value,
      "price": price.current.value,
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
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        handleGet(e);
      });
  }

  const handleGet = e => {
    // e.preventDefault();
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
        handleGetExpenseTotal(e)
        console.log({expenseItems})
      })
  }

  const handleGetExpenseTotal = e => {
    e.preventDefault();
    const username = window.localStorage.getItem('username');
    fetch("http://localhost:5000/get-expense-total/", {
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
        setTotalExpense(data);
        console.log(totalExpense);
      })
  }


  const handleDelete = async e => {
    e.preventDefault();
    const expense = deleteItem;
    const expensePrice = deleteItemPrice;
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
        username,
        price : expensePrice
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
        <input type="text" name="desc" id="desc" placeholder="Expense Description..." ref={desc}/> 
        <input type="number" name="price" id="price" placeholder="Price..." ref={price}/>
        {/* <input type="text" name="date" id="date" placeholder="Date of expense... (mm/dd/yy)" ref={date} /> */}
        <br></br>
        <input className="btn btn-success" type="submit" value="Add Expense" />
      </div>
    </form>

    <div className="expense-list">
      {/* <button className="btn btn-success" onClick={async (e) =>{
        await handleGet(e)
        }}> Get expenses</button> */}
        <br></br>
      {expenseItems.map((expenseItem, idx) => (
            <div key={idx}>
              {/* {moment(expenseItem.date).format('MM/DD/YY')} was included below */}
              <span className='d-flex align-items-center'>
               <div className="financial-item">{expenseItem.expenseItem}</div>
               <div className="align-right"> ${expenseItem.price} </div>
               <button className="remove-button" onClick={async (e) => {
                deleteItem = expenseItem.expenseItem;
                deleteItemPrice = expenseItem.price;
                await handleDelete(e);
              }}>
                X
              </button>
              </span>
            </div>
          ))}
      <br></br>
      <div className="total-income">$ {totalExpense} </div>
    </div>
    </div>
  )
}

export default ExpenseList;