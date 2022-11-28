import React, {useState} from "react";
import { Chart } from "react-google-charts";
import { Geography, Geographies } from "react-simple-maps"
const google = window.google;

const Destinations = props => {
    const [newData, setNewData] = useState([
        ["Country", "Visited"],
        ["Germany", 0],
        ["United States", 300],
        // ["Brazil", 400],
        ["Canada", 500],
        ["France", 600],
        ["RU", 700]
    ])
    const data = [
        ["Country", "Visited"],
        ["United States", 100],
    ];
    var item = "";

    const options = {
        colorAxis: { colors: ["white", "#e31b23"] },
        backgroundColor: "#81d4fa",
        legend: "none",
        // datalessRegionColor: "#f8bbd0",
        // defaultColor: "#f5f5f5",
      };

    return (
        <div >
            <Chart chartType="GeoChart" 
            width="100%" 
            height="450px" 
            data={newData} 
            options={options}
            />
            {/* setItem([e.target.value, 400] */}
            <input className='add-item-input' onChange={(e) => {item = e.target.value} } placeholder='Add an item...'/>
            <button className="btn btn-success" onClick={() => setNewData([...newData, [item, 400]])}> Add </button>
          
        </div>
        
    );
};

export default Destinations;

