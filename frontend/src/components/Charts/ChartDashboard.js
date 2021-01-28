import React from "react";
import { CCard, CCardHeader, CCardBody } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";

const ChartDashboard = () => {
  const line = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
    datasets: [
      {
        label: "Temperature",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40, 0],
      },
      {
        label: "Humidity",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(179,181,198,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(179,181,198,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [10, 20, 30, 70, 56, 34, 22, 0],
      },
    ],
  };
  const options = {
    // tooltips: {
    //   enabled: false,
    //   custom: customTooltips
    // },
    maintainAspectRatio: false,
  };
  return (
    <div className="row">
      <div className="col-sm-12">
        <CCard>
          <CCardHeader>Data from DHT11</CCardHeader>
          <CCardBody>
            <div className="chart-wrapper">
              <CChart style={{height: 300}} type="line" datasets={line.datasets} options={options} />
            </div>
          </CCardBody>
        </CCard>
      </div>
    </div>
  );
};

export default ChartDashboard;
