import React from "react";
import { Chart } from "react-google-charts";

const Destinations = props => {
    const data = [
        ["Country", "Popularity"],
        ["Germany", 200],
        ["United States", 300],
        ["Brazil", 400],
        ["Canada", 500],
        ["France", 600],
        ["RU", 700]
    ];

    return (
        <div >
            <Chart chartType="GeoChart" width="100%" height="400px" data={data} />
        </div>

    );
};

export default Destinations;