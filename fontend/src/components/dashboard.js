import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PackingList from "./dashboardComponents/packing-list";
import Agenda from "./dashboardComponents/agenda";
import FinancialPlanner from "./dashboardComponents/financial-planner";

const Dashboard = props => {

  return (
    <div className="row">

      <div className="col-lg-4 pb-1">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"> Agenda</h5>
            <Agenda></Agenda>
          </div>
        </div>
      </div>

      <div className="col-lg-4 pb-1">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Financial Planner</h5>
            <FinancialPlanner></FinancialPlanner>
          </div>
        </div>
      </div>

      <div className="col-lg-4 pb-1">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"> Packing List</h5>
            <PackingList></PackingList>
          </div>
        </div>
      </div>

    </div>

  );
};

export default Dashboard;