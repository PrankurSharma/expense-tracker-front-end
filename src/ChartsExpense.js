import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import Spinner from "./Spinner";
import axios from "axios";


const ChartsExpense = () => {
  const [chartData, setChartData] = useState({});

  var palette = ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"];

  const chart = () => {
    let getAmount = [];
    let getTask = [];
    const [loading, setLoading] = useState(true);
      
    useEffect(() => {
      const loadData = async () => {
        await new Promise((r) => setTimeout(r, 5000));
        setLoading((loading) => !loading);
      };
        
      loadData();
    }, []);
      axios.get("https://my-expense-tracker-project.herokuapp.com/api/getexpense")
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
                borderWidth: 1
              }
            ]
          });
        })
        .catch(err => {
          console.log(err);
        });
      console.log(getTask, getAmount);
    };

    useEffect(() => {
      chart();
    }, []);

    if (loading) {
		  return (<Spinner />);
	  }

    else{
      return (
        <div className="App">
          <div>
            <Doughnut
              data={chartData}
              options={{
                responsive: true,
                title: { text: "Money Added", display: true },
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
  }
};
export default ChartsExpense;