"use client";

import React, { useEffect, useState, useRef } from "react";
import ProjectCard from "@components/ProjectCard";
import ShareButton from "@components/ShareButton";
import TicketStatusCard from "@components/TicketStatusCard";
import TeamActivityPie from "@components/TeamActivityPie";
import TasksActivity from "@components/TasksActivity";
import Loading from "@components/Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSitemap } from "@fortawesome/free-solid-svg-icons";

// import { useSearchParams } from "next/router";

export default function TeamOverview() {
  // const searchParams = useSearchParams();

  const [repo, setRepo] = useState({});
  const [issuesClosed, setIssuesClosed] = useState([]);
  const [issuesOpen, setIssuesOpen] = useState([]);
  const [pr, setPR] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/gitHubAPI");
        const data = await response.json();
        setRepo(data[0]);
        setIssuesClosed(data[1]);
        setIssuesOpen(data[2]);
        setPR(data[3]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  // const shareCurrentPath = () => {
  //   const currentPath = searchParams.asPath;
  //  const search = searchParams.get();

  //   if (searchParams.asPath) {
  //     router
  //       .share({
  //         url: currentPath,
  //       })
  //       .then(() => {
  //         console.log("Successfully shared the current path");
  //       })
  //       .catch((error) => {
  //         console.error("Error sharing the current path:", error);
  //       });
  //   } else {
  //     console.log("Sharing is not supported in this browser");
  //   }
  // };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col justify-start w-full h-screen">
      <div className="flex justify-between items-center md:pt-2 px-6">
        <div className="flex flex-col justify-between py-2">
          <ul>
            <li className="flex justify-start items-center font-semibold text-xl text-white py-2">
              Team
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-xl text-white p-2 hover:text-[#37BCBA]"
                title="Link to deployed webpage"
              >
                {repo.name}
                <FontAwesomeIcon icon={faSitemap} className="w-8 mr-3" />
              </a>
            </li>
          </ul>
          <p className="font-light text-xs text-gray-500">
            Track your projects, tasks & team activity here
          </p>
        </div>
        <ShareButton />
      </div>

      <div className="relative">
        <div
          ref={containerRef}
          className="grid sm:flex gap-6 p-4 lg:p-6 md:gap-10 xl:gap-20 2xl:gap-24 overflow-x-auto"
        >
          <ProjectCard repo={repo} pr={pr} />
          <TeamActivityPie pr={pr} />
          <TicketStatusCard
            issuesClosed={issuesClosed}
            issuesOpen={issuesOpen}
          />
        </div>
      </div>
      <TasksActivity
        issuesClosed={issuesClosed}
        issuesOpen={issuesOpen}
        repo={repo}
      />
    </div>
  );
}
