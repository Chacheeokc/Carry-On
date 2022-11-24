import React, { useState, useEffect } from "react";
import ExpenseForm from "./financialPlannerComponents/expense-form";
import ExpenseList from "./financialPlannerComponents/expense-list";


const FinancialPlanner = props => {
    const [expense, setExpense] = useState([]);
	const [totalExpense, setTotalExpense] = useState(0);

	useEffect(() => {
		let temp = 0;
		for(let i = 0; i < expense.length; i++) {
			temp += parseInt(expense[i].price);
		}

		setTotalExpense(temp);
	}, [expense]);
	

	return (
		<div >
			<ExpenseForm income={expense} setIncome={setExpense} />
			<ExpenseList income={expense} setIncome={setExpense} />
            <div className="total-income">$ {totalExpense}</div>
		</div>
	);
}

export default FinancialPlanner;