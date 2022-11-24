import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PackingList from "./dashboardComponents/packing-list";
import Agenda from "./dashboardComponents/agenda";
import FinancialPlanner from "./dashboardComponents/financial-planner";

const Dashboard = props => {

  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title"> Agenda</h3>
            <Agenda></Agenda>
          </div>
        </div>
      </div>

      <div className="col-sm-3 pb-1">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Financial Planner</h3>
            <FinancialPlanner></FinancialPlanner>
          </div>
        </div>
      </div>

      <div className="col-sm-3 pb-1">
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