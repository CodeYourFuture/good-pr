import React, { useEffect, useState, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faChartPie,
  faInfoCircle,
  faFaceMeh,
} from "@fortawesome/free-solid-svg-icons";

export default function IssuesActivityCard({ issuesClosed }) {
  useEffect(() => {
    import("@components/Tooltips").then((module) => {
      const handleTooltips = module.handleTooltips;
      handleTooltips();
    });
  }, []);

  const [chartOptions, setChartOptions] = useState(null);
  const [chartType, setChartType] = useState("bar");
  const [completedIssues, setCompletedIssues] = useState(0);
  const chartContainerRef = useRef(null);

  // const issuesAssignee = issuesClosed
  //   .filter((user) => user.items && user.items.length > 0) // Filter out undefined or empty items
  //   .map((user) => user.items[0].user.login);

  const totalIssues = issuesClosed.reduce(
    (total, issue) => total + (issue.total_count || 0),
    0
  );

  const names = issuesClosed.map((user) =>
    user.items.filter((el) => el.assignees.length === 1)
  );

  const issuesAssignee = names
    .map((el) => el.map((e) => e.assignees[0].login))
    .map((el) => el[0]);
  console.log(names);

  useEffect(() => {
    const chartData = names.map((user) => {
      const total_count = user.length || 0;
      console.log(total_count);
      return {
        name: filterAndTruncateName(user[0].assignees[0].login, 6),
        value: calculatePercentage(total_count, totalIssues),
        issuesCount: total_count,
      };
    });

    const options = {
      tooltip: {
        trigger: "item",
        formatter: function (params) {
          return `${params.name}: ${params.data.issuesCount} issues`;
        },
        backgroundColor: "#6064677F",
        textStyle: {
          color: "#fff",
        },
      },
      legend: {
        orient: "vertical",
        x: "right",
        right: "1",
        textStyle: {
          fontSize: 12,
          color: "#606467",
        },
        padding: [10, 20, 10, 10],
        data: chartData.map((dataItem) => dataItem.name),
      },
      series: [
        {
          name: "Contributions",
          type: chartType, // Use the current chart type
          radius: ["35%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "inside",
            formatter: chartType === "pie" ? "{d}%" : "{c}%",
            color: "#000",
            fontSize: 15,
          },
          labelLine: {
            show: false,
            length: 10,
            length2: 10,
          },
          data: chartData,
          itemStyle: {
            color: (params) =>
              [
                "rgba(255, 240, 67, 0.8)",
                "rgba(234, 88, 12, 0.8)",
                "rgba(14, 116, 144, 0.8)",
                "rgba(124, 58, 237, 0.8)",
                "rgba(161, 98, 7, 0.8)",
              ][params.dataIndex % 5],
          },
        },
      ],
      xAxis: {
        type: "category",
        axisLabel: {
          formatter: (value) => value.substring(0, 6),
        },
        data: issuesAssignee.map((user) => user),
        show: chartType === "bar",
        axisLine: {
          lineStyle: {
            color: "#606467",
          },
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        max: 100,
        show: chartType === "bar",
        axisLabel: {
          // margin: -300,
          // position: "right",
        },
        axisLine: {
          lineStyle: {
            color: "#606467",
          },
        },
        splitLine: {
          // show: false,
          lineStyle: {
            color: "#676360",
            opacity: 0.04,
          },
          width: "100%", // Set the default width for the chart
          height: "400px", // Set the default height for the chart
        },
      },
    };

    setChartOptions(options);
  }, [issuesClosed, chartType]);

  const filterAndTruncateName = (name, maxLength) => {
    const filteredName = name.replace(/[^A-Za-z0-9]/g, ""); // Remove non-alphanumeric characters
    return filteredName.substring(0, maxLength);
  };

  useEffect(() => {
    // Update the count of Issues done dynamically
    const interval = setInterval(() => {
      if (completedIssues < totalIssues) {
        setCompletedIssues((prevCount) => prevCount + 1);
      }
    }, 40);

    return () => {
      clearInterval(interval);
    };
  }, [completedIssues, totalIssues]);

  useEffect(() => {
    const handleResize = () => {
      if (
        chartContainerRef.current &&
        chartContainerRef.current.echartsElement
      ) {
        const echartsInstance =
          chartContainerRef.current.echartsElement.getEchartsInstance();
        if (echartsInstance) {
          echartsInstance.resize();
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const calculatePercentage = (individualIssuesNumber, totalIssues) => {
    if (totalIssues === 0) {
      return 0;
    }

    const percentage = (100 * individualIssuesNumber) / totalIssues;
    const roundedPercentage = Math.round(percentage);

    return roundedPercentage;
  };

  const handleChartTypeChange = (event) => {
    event.preventDefault();
    setChartType((prevChartType) => (prevChartType === "bar" ? "pie" : "bar"));

    const newChartType = chartType === "bar" ? "pie" : "bar";
    setChartType(newChartType);

    setTimeout(() => {
      setChartType(newChartType);
    }, 300);
  };

  return (
    <div className="bg-[#1A1E1F] rounded-2xl w-full min-w-max">
      <div className="flex flex-col max-w-xs mx-auto md:max-w-md lg:max-w-lg p-6 space-y-10 h-80 relative">
        <div className="flex space-x-10 items-center">
          <div className="flex items-center z-10">
            <h1 className="font-bold text-sm text-white">Issues Activity</h1>
            <div>
              <FontAwesomeIcon
                icon={faInfoCircle}
                data-tooltip-target="tooltip-info-issues"
                data-tooltip-placement="button"
                className="w-4 h-4 ml-2 cursor-help text-white hover:text-gray-400 transition duration-300 hover:scale-110"
              />
              <div
                id="tooltip-info-issues"
                role="tooltip"
                className="absolute z-10 left-0 top-12 invisible inline-block p-2 mx-6 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip border border-slate-100 dark:bg-[#1A1E1F] "
              >
                This interactive chart displays the number of issues (for the
                repo) and contributions made by each team member. Clicking on a
                contributor's name allows you to filter and compare their
                individual data.
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
            <div
              id="tooltip-info-chart-issues"
              role="tooltip"
              className="absolute z-10 right-16 top-12 invisible inline-block p-2 mx-6 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip border border-slate-100 dark:bg-[#1A1E1F]"
            >
              Change chart type
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>

          <div className="flex justify-center items-center absolute inset-0 -left-6 -top-[248px]">
            <a
              href="#"
              className="text-gray-500 text-xl z-10"
              onClick={handleChartTypeChange}
            >
              {chartType === "pie" ? (
                <FontAwesomeIcon
                  icon={faChartSimple}
                  data-tooltip-target="tooltip-info-chart-issues"
                  data-tooltip-placement="button"
                  className="w-6 mr-3 text-white transition duration-300 hover:scale-110 hover:text-teal-500"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faChartPie}
                  data-tooltip-target="tooltip-info-chart-issues"
                  data-tooltip-placement="button"
                  className="w-6 mr-3 text-white transition duration-300 hover:scale-110 hover:text-teal-500"
                />
              )}
            </a>
          </div>
        </div>
        {issuesClosed.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <FontAwesomeIcon
              icon={faFaceMeh}
              className="w-20 mr-3 text-white transition duration-300"
            />
            <div>Oh no! There are no issues for this group! </div>
          </div>
        ) : (
          <div
            className="flex justify-center items-center h-80 w-full min-w-[300px] relative"
            style={{
              transition: "height 1s ease-in",
              height: chartType === "bar" ? "320px" : "360px",
            }}
          >
            {chartType === "pie" ? (
              <div className="flex justify-center items-center absolute inset-0 -mb-1">
                <div className="text-[#F9F9F9] font-bold text-2xl">
                  {completedIssues}
                </div>
                <p className="text-[#606467] text-xs ml-[10px]">Issues Done</p>
              </div>
            ) : (
              ""
            )}
            <div
              className="absolute -top-[69px] w-full h-full "
              ref={chartContainerRef}
            >
              {chartOptions && (
                <ReactECharts
                  option={chartOptions}
                  container="chart-container"
                  className="h-full"
                  style={{ height: "350px" }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
