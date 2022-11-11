import React, { useState, useEffect } from "react";
import ExpenseForm from "./financialPlannerComponents/expense-form";
import ExpenseList from "./financialPlannerComponents/expense-list";


const FinancialPlanner = props => {
    const [income, setIncome] = useState([]);
	const [totalIncome, setTotalIncome] = useState(0);

	useEffect(() => {
		let temp = 0;
		for(let i = 0; i < income.length; i++) {
			temp += parseInt(income[i].price);
		}

		setTotalIncome(temp);
	}, [income]);
	

	return (
		<div >
			<ExpenseForm income={income} setIncome={setIncome} />
			<ExpenseList income={income} setIncome={setIncome} />
            <div className="total-income">$ {totalIncome}</div>
		</div>
	);
}

export default FinancialPlanner;