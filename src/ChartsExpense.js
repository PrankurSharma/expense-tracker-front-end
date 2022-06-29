import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";


const ChartsExpense = () => {
  const [chartData, setChartData] = useState({});
  let [getAmount, set_getAmount] = useState([]);
  let [getTask, set_getTask] = useState([]);

  var palette = ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"];

  const chart = () => {
    axios.get("https://my-expense-tracker-project.herokuapp.com/api/getexpense")
      .then(res => {
        for (const dataObj of res.data) {
          set_getAmount(parseInt(dataObj.Amount));
          set_getTask(dataObj.Task);
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
  }, [getAmount, getTask]);
  return (
    <div className="App">
      <div style={{width: '100%', height: '100%'}}>
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
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