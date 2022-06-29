import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";


const ChartsIncome = () => {
  const [chartData, setChartData] = useState({});
  const [list1, set_list1] = useState([]);
  const [list2, set_list2] = useState([]);

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
        set_list1(getAmount);
        set_list2(getTask);
        setChartData({
          labels: list2,
          datasets: [
            {
              label: "Amount",
              data: list1,
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
export default ChartsIncome;