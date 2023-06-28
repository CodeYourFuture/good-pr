"use client";
import OverallInfoCard from "./OverallInfoCard";
import ProjectCard from "./ProjectCard";
import TaskActivity from "./TasksActivity";
import TeamActivity from "./TeamActivity";
import React, { useEffect, useState } from "react";

const TeamOverview = () => {
  const [repo, setRepo] = useState({});
  const [assignees, setAssignees] = useState([]);
  const [issuesClosed, setIssuesClosed] = useState([]);
  const [issuesOpen, setIssuesOpen] = useState([]);
  const [pr, setPR] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/gitHubAPI");
        const data = await response.json();
        setRepo(data[0]);
        setAssignees(data[1]);
        setIssuesClosed(data[2]);
        setIssuesOpen(data[3]);
        setPR(data[4]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // console.log("repo", repo);
  // console.log("assignees", assignees);
  // console.log("issues", issues);
  // console.log("pr", pr);

  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#36BCBA] animate-pulse"></div>
        <div className="w-16 h-2 bg-gray-300 relative">
          <div className="h-full bg-[#36BCBA] absolute top-0 left-0 animate-slide"></div>
        </div>
      </div>
    </div>
  ) : (
    <div class=" p-6">
      {/* Content for the right div */}
      <h1 className="font-bold text-white p-4 ">Team Overview</h1>
      <p className="font-light	text-xs	text-gray-600	pt-1 p-4 ">
        Track you projects, tasks & team activity here
      </p>
      <div className=" flex flex-nowrap justify-between mt-4 gap-4 p-6 ">
        <ProjectCard assignees={assignees} repo={repo} />
        <OverallInfoCard issuesClosed={issuesClosed} issuesOpen={issuesOpen} />
        <TeamActivity assignees={assignees} pr={pr} />
      </div>
      <TaskActivity issuesClosed={issuesClosed} issuesOpen={issuesOpen} />
    </div>
  );
};

export default TeamOverview;
