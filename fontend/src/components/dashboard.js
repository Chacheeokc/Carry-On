import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PackingList from "./dashboard components/packing-list";
import Agenda from "./dashboard components/agenda";

const Dashboard = props => {
  return (
    <div className="row">

      <div className="col-lg-4 pb-1">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"> Agenda</h5>
            {/* <Agenda/> */}
          </div>
        </div>
      </div>

      <div className="col-lg-4 pb-1">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Financial Planner</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="https://mdbootstrap.com/docs/b4/jquery/components/cards/" class="btn btn-primary">Go somewhere</a>
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