import React from "react";
import Chart from "react-google-charts";

function StatsColumnChart({ data }) {
  let formattedData = [["Continet", "Infected", "Recovered", "Deceased"]];

  data.forEach((continent) => {
    let continentArray = [];
    continentArray.push(continent.continent);
    continentArray.push(continent.cases);
    continentArray.push(continent.recovered);
    continentArray.push(continent.deaths);
    formattedData.push(continentArray);
  });

  return (
    <div className="chart">
      <Chart
        width={"1400px"}
        height={"550px"}
        chartType="ColumnChart"
        loader={<div>Loading Chart</div>}
        data={formattedData}
        options={{
          legend: { position: "bottom", maxLines: 3 },
          hAxis: {
            minValue: 0,
            textStyle: {
              fontSize: 15,
            },

          },
          vAxis:{
            minValue: 0,
          },
          colors: ["#55B3B1", "#F6C065", "#AF0069"],
          explorer: {
            actions: ["dragToZoom", "rightClickToReset"],
            axis: "vertical",
            keepInBounds: true
          },
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
}

export default StatsColumnChart;
