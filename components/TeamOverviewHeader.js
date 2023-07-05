"use client";

import OverallInfoCard from "@components/OverallInfoCard";
import ProjectCard from "@components/ProjectCard";
import TeamActivityPie from "@components/TaskActivityPie";
import TaskActivity from "@components/TasksActivity";
import React, { useEffect, useState } from "react";

export default function TeamOverview() {
  const [repo, setRepo] = useState({});
  const [issuesClosed, setIssuesClosed] = useState([]);
  const [issuesOpen, setIssuesOpen] = useState([]);
  const [pr, setPR] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch("/api/gitHubAPI");
  //       const data = await response.json();
  //       setRepo(data[0]);
  //       setIssuesClosed(data[1]);
  //       setIssuesOpen(data[2]);
  //       setPR(data[3]);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <svg
        className="animate-spin h-20 w-20 text-[#36BCBA]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          className="fill-current"
          d="M12 0a12 12 0 00-3.91 23.38c.62.12.84-.27.84-.6l-.02-2.1c-3.44.75-4.18-1.66-4.18-1.66-.57-1.46-1.4-1.85-1.4-1.85-1.14-.78.09-.76.09-.76 1.27.09 1.94 1.31 1.94 1.31 1.13 1.94 2.97 1.38 3.69 1.06.11-.82.44-1.38.8-1.7-2.81-.32-5.75-1.4-5.75-6.22 0-1.37.49-2.48 1.31-3.36-.13-.32-.57-1.59.12-3.31 0 0 1.05-.34 3.44 1.28a11.98 11.98 0 016 0c2.39-1.62 3.44-1.28 3.44-1.28.69 1.73.25 2.99.12 3.31.81.88 1.31 1.99 1.31 3.36 0 4.83-2.94 5.89-5.76 6.2.45.38.85 1.15.85 2.32l-.01 3.44c0 .33.22.72.85.6A12 12 0 0012 0z"
        />
      </svg>
    </div>
  ) : (
    <div className="">
      <div className="p-2 pt-24 md:pt-2">
        <h1 className="font-bold text-white p-4">Team Overview</h1>
        <p className="font-light text-xs text-gray-500 pt-1 p-4">
          Track you projects, tasks & team activity here
        </p>
        <div className="grid sm:flex md:space-y-0 mt-4 gap-4 p-3 md:p-6">
          <ProjectCard repo={repo} pr={pr} />
          <TeamActivityPie pr={pr} />
          <OverallInfoCard
            issuesClosed={issuesClosed}
            issuesOpen={issuesOpen}
          />
        </div>
        <TaskActivity
          issuesClosed={issuesClosed}
          issuesOpen={issuesOpen}
          repo={repo}
        />
      </div>
    </div>
  );
}
