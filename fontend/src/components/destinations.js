import React, {useState, useEffect} from "react";
import { Chart } from "react-google-charts";
import "./destinations.css"

function Destinations() {
    const [newData, setNewData] = useState([
        ["Country", "Visited"],
        // ["Germany", 0],
        // ["United States", 300],
        // // ["Brazil", 400],
        // ["Canada", 500],
        // ["France", 600],
        // ["RU", 700]
    ])
 
    var item = "";
    var array = [];

    const options = {
        colorAxis: { colors: ["white", "green"] },
        backgroundColor: "#81d4fa",
        legend: "none",
        // datalessRegionColor: "#f8bbd0",
        // defaultColor: "#f5f5f5",
      };

      useEffect(() => {
        let ignore = false;
        
        if (!ignore)  handleGet();
        return () => { ignore = true; }
        },[]);

      const handlePut = e => {
        const username = window.localStorage.getItem('username');
        fetch("http://localhost:5000/add-destination", {
          method: "PUT",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            username,
            destination : array
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
        fetch("http://localhost:5000/get-destinations", {
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
            setNewData(data);
            console.log(data);
          })
      }

      const handleDelete = e => {
        e.preventDefault();
        const username = window.localStorage.getItem('username');
        fetch("http://localhost:5000/delete-destination", {
          method: "DELETE",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            username,
            destination : array,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userRegister");
            handleGet(e);
          });
      }
    
    return (
        <div >
            <Chart chartType="GeoChart" 
            width="100%" 
            height="450px" 
            data={newData} 
            options={options}
            />
            {/* <button className="btn btn-success" onClick={(e) => { handleGet(e)}}> Get Destinations</button> */}
            <br></br>

            <input type="text" onChange={(e) => {item = e.target.value} } placeholder='Add an item...'/>
            <button className="destination-button" onClick={async (e) => {array = [item,400]; await handlePut(e) }}> Add </button>
            <input type="text" onChange={(e) => {item = e.target.value} } placeholder='Delete an item...'/>
            <button className="destination-button" onClick={async (e) => {array = [item,400]; await handleDelete(e) }}> Delete </button>
        </div>
        
    );
};

export default Destinations;

