import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";


const ChartsIncome = () => {
  const [chartData, setChartData] = useState({});

  var palette = ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"];

  const chart = () => {
    let getAmount = [];
    let getTask = [];

    axios.get("https://my-expense-tracker-project.herokuapp.com/api/getincome")
      .then(res => {
        for (const dataObj of res.data) {
          getAmount.push(parseInt(dataObj.Amount));
          getTask.push(dataObj.Task);
        }
        setChartData({
          labels: getTask,
          datasets: [
            {
              label: "Amount",
              data: getAmount,
              backgroundColor: function (context) {
                return palette[context.dataIndex % palette.length];
              },
              borderWidth: 0
            }
          ]
        });
      })
      .catch(err => {
        alert(err);
      });
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App">
      <div style={{height:"auto",position:"relative", marginBottom:"1%", padding:"1%"}}>
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
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
export default ChartsIncome;