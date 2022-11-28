import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PackingList from "./dashboardComponents/packing-list";
import Agenda from "./dashboardComponents/agenda";
import ExpenseList from "./dashboardComponents/expense-list";
// import "../index.css"


const Dashboard = props => {

  return (
    <div className="row">
      <div class="col-4">
        <div className="card" >
          <div className="card-body">
            <h3 className="card-title"> Agenda</h3>
            <Agenda></Agenda>
          </div>
        </div>
      </div>

      <div class="col-4">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Financial Planner</h3>
            <ExpenseList></ExpenseList>
          </div>
        </div>
      </div>

      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title"> Packing List</h3>
            <PackingList></PackingList>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;