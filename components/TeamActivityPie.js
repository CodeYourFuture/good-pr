import React, { useEffect, useState, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faChartPie,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function TeamActivityPie({ pr, repo }) {
  useEffect(() => {
    import("@components/Tooltips").then((module) => {
      const handleTooltips = module.handleTooltips;
      handleTooltips();
    });
  }, []);

  const [chartOptions, setChartOptions] = useState(null);
  const [chartType, setChartType] = useState("pie");
  const [prsDoneCount, setPrsDoneCount] = useState(0);
  const chartContainerRef = useRef(null);
  const [statusData, setStatusData] = useState([]);
  const [repositoriesData, setRepositoriesData] = useState([]);

  const prUsers = pr
    .filter((user) => user.items && user.items.length > 0) // Filter out undefined or empty items
    .map((user) => user.items[0].user.login);

  const totalContributions = pr.reduce(
    (total, prs) => total + (prs.total_count || 0),
    0
  );

  //fetch from status table
  useEffect(() => {
    // Fetch data from the /api/status endpoint
    fetch("/api/status")
      .then((response) => response.json())
      .then((data) => {
        setStatusData(data); // Store the fetched data in state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch data from the /api/repositories endpoint
    fetch("/api/repositories")
      .then((response) => response.json())
      .then((data) => {
        setRepositoriesData(data); // Store the fetched data in state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const updateRecord = async (id, updatedData) => {
    try {
      const response = await fetch("/api/updateRepository", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, data: updatedData }),
      });

      if (response.ok) {
        // The record was updated successfully, you can handle it here
        console.log("Record updated successfully.");
      } else {
        console.error("Error updating record:", response.status);
      }
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  useEffect(() => {
    if (statusData.length > 0 && repositoriesData.length > 0) {
      const calculateTeamStatus = (pr, totalContributions) => {
        const individualPRPercentages = pr.map(
          (el) => (el.total_count / totalContributions) * 100
        );
        const sizeOfTeam = individualPRPercentages.length;
        const minimum = 100 / (sizeOfTeam + 1);
        const maximum = 100 / (sizeOfTeam - 1);
        return individualPRPercentages.every(
          (el) => el >= minimum && el <= maximum
        );
      };

      const findStatusAndUpdate = (statusData, statusName, statusToUpdate) => {
        const status = statusData.find((el) => el.status === statusName);
        if (status) {
          statusToUpdate = status.id;
        }
        return statusToUpdate;
      };

      const teamStatus = calculateTeamStatus(pr, totalContributions);
      let statusToUpdate = 0;

      if (!teamStatus) {
        statusToUpdate = findStatusAndUpdate(
          statusData,
          "needHelp",
          statusToUpdate
        );
      } else {
        statusToUpdate = findStatusAndUpdate(
          statusData,
          "onTrack",
          statusToUpdate
        );
      }

      const updatedData = repositoriesData.find((el) => el.id === repo.id);

      if (updatedData) {
        updatedData.statusId = statusToUpdate;
        updateRecord(repo.id, updatedData);
      }
    }
  }, [repositoriesData, statusData]);

  useEffect(() => {
    const chartData = prUsers.map((user) => {
      const prItem = pr.find(
        (prs) =>
          prs.items && prs.items.length > 0 && prs.items[0].user?.login === user
      );
      const total_count = prItem?.total_count || 0;
      return {
        name: filterAndTruncateName(user, 6),
        value: calculatePercentage(total_count, totalContributions),
        prCount: total_count,
      };
    });

    const options = {
      tooltip: {
        trigger: "item",
        // formatter: "{b}: {d}%",
        formatter: function (params) {
          return `${params.name}: ${params.data.prCount} PRs`;
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
        data: prUsers.map((user) => user),
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
  }, [pr, chartType]);

  const filterAndTruncateName = (name, maxLength) => {
    const filteredName = name.replace(/[^A-Za-z0-9]/g, ""); // Remove non-alphanumeric characters
    return filteredName.substring(0, maxLength);
  };

  useEffect(() => {
    // Update the count of PRs done dynamically
    const interval = setInterval(() => {
      if (prsDoneCount < totalContributions) {
        setPrsDoneCount((prevCount) => prevCount + 1);
      }
    }, 40);

    return () => {
      clearInterval(interval);
    };
  }, [prsDoneCount, totalContributions]);

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

  const calculatePercentage = (individualPrNumber, totalContributions) => {
    if (totalContributions === 0) {
      return 0;
    }

    const percentage = (100 * individualPrNumber) / totalContributions;
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
      <div className="flex flex-col justify-between max-w-xs mx-auto md:max-w-md lg:max-w-lg p-6 space-y-10 h-80 relative">
        <div className="flex space-x-10 items-center">
          <div className="flex items-center z-10">
            <h1 className="font-bold text-sm text-white">PR Activity</h1>
            <div>
              <FontAwesomeIcon
                icon={faInfoCircle}
                data-tooltip-target="tooltip-info"
                data-tooltip-placement="button"
                className="w-4 h-4 ml-2 cursor-help text-white hover:text-gray-400 transition duration-300 hover:scale-110"
              />
              <div
                id="tooltip-info"
                role="tooltip"
                className="absolute z-10 left-0 top-12 invisible inline-block p-2 mx-6 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip border border-slate-100 dark:bg-[#1A1E1F] "
              >
                This interactive chart displays the number of Pull Requests
                (PRs) and contributions made by each contributor. Clicking on a
                contributor's name allows you to filter and compare their
                individual data.
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
            <div
              id="tooltip-info-chart"
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
                  data-tooltip-target="tooltip-info-chart"
                  data-tooltip-placement="button"
                  className="w-6 mr-3 text-white transition duration-300 hover:scale-110 hover:text-teal-500"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faChartPie}
                  data-tooltip-target="tooltip-info-chart"
                  data-tooltip-placement="button"
                  className="w-6 mr-3 text-white transition duration-300 hover:scale-110 hover:text-teal-500"
                />
              )}
            </a>
          </div>
        </div>
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
                {prsDoneCount}
              </div>
              <p className="text-[#606467] text-xs ml-[10px]">PRs Done</p>
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
      </div>
    </div>
  );
}
