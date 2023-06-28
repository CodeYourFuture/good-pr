"use client";
import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default function TeamActivity({ pr }) {
  const trainees = pr.filter((el) => el.items.length !== 0);
  console.log(trainees.map((trainee) => trainee.items[0].user.login));
  const chartRef = useRef(null);

  let totalContributions = 0;
  pr.forEach((prs) => {
    totalContributions += prs.total_count;
  });

  function calculatePercentage(individualPrNumber) {
    return Math.round(
      (100 * individualPrNumber.total_count) / totalContributions
    );
  }
  console.log("ta", totalContributions);

  useEffect(() => {
    const chartData = {
      labels: trainees.map((trainee) => trainee.items[0].user.login),
      datasets: [
        {
          label: "Contributions",
          data: pr.map((user) => calculatePercentage(user)),
          backgroundColor: ["#E2E949", "#36BCBA", "#f55706"],
        },
      ],
    };

    const chartOptions = {
      indexAxis: "y",
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const dataset = context.dataset;
              const value = dataset.data[context.dataIndex];
              return `${value}%`;
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            callback: (value) => `${value}%`,
            precision: 0,
            stepSize: 25,
            max: 100,
          },
        },
      },
    };

    const chart = new Chart(chartRef.current, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 max-w-m bg-[#1A1E1F] p-9 rounded-2xl ">
      <div className="flex flex-column justify-between">
        <h2 className="text-[#F9F9F9] font-bold">Team Activity</h2>
      </div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
