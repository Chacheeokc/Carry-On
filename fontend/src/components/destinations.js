import React from "react";
import { Chart } from "react-google-charts";
import { Geography, Geographies } from "react-simple-maps"
const google = window.google;

const Destinations = props => {
    const data = [
        ["Country", "Visited"],
        ["Germany", 0],
        ["United States", 300],
        ["Brazil", 400],
        ["Canada", 500],
        ["France", 600],
        ["RU", 700]
    ];

    // var data = google.visualization.arrayToDataTable([
    //     ['Country', 'Popularity'],
    //     ['South America', 600],
    //     ['Canada', 500],
    //     ['France', 600],
    //     ['Russia', 700],
    //     ['Australia', 600]
    //   ]);

    const options = {
        colorAxis: { colors: ["white", "#e31b23"] },
        backgroundColor: "#81d4fa",
        legend: "none",
        // datalessRegionColor: "#f8bbd0",
        // defaultColor: "#f5f5f5",
      };

      const thisHappens = e =>{
        console.log("youclicked it")
      }
    
      

    return (
        <div >
            <Chart chartType="GeoChart" 
            width="100%" 
            height="450px" 
            data={data} 
            options={options}
            regionClick={thisHappens}
            />
        </div>
        // <div>
        //     <Geographies> </Geographies>
        // </div>

    );
};

export default Destinations;

