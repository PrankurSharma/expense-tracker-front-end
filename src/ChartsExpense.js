import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";


const ChartsExpense = () => {
  const [chartData, setChartData] = useState({});

  var palette = ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"];

    var getAmount = [];
    var getTask = [];

    axios.get("https://my-expense-tracker-project.herokuapp.com/api/getexpense")
      .then(res => {
        for (const dataObj of res.data) {
          getAmount.push(parseInt(dataObj.Amount));
          getTask.push(dataObj.Task);
        }
      })
      .catch(err => {
        alert(err);
      });

  return (
    <div className="App">
      <div style={{height:"auto",position:"relative", marginBottom:"1%", padding:"1%"}}>
        <Pie
          data={{ 
            labels: getTask,
            datasets: [
              {
                data: getAmount,
                backgroundColor: palette,
                borderWidth: 1
              }
            ]
          }}
          options={{
            responsive: true,
            title: { text: "Money Added", display: true },
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              yAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }]
            }
          }}
        />
      </div>
    </div>
  );
};
export default ChartsExpense;