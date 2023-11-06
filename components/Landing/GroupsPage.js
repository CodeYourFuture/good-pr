"use client";

import { useEffect, useState } from "react";
import TeamCard from "@components/Landing/TeamCard";
import Loading from "@components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import FilterToggle from "./FillterToggle";

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterActive, setFilterActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/repositories");
        const data = await response.json();
        setGroups(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterToggle = () => {
    setFilterActive(!filterActive);
  };

  const filteredGroups = filterActive
    ? groups.filter((group) => group.groupStatus)
    : groups;

  const noTeamsNeedHelp = filteredGroups.length === 0;

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col pt-24 sm:pt-0 justify-start w-full h-full ">
      <div className="flex justify-between items-center md:pt-6 px-6">
        <div className="flex flex-col justify-between py-2 gap-4">
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faGithub}
              className="text-[#37BCBA] h-7 mr-2"
            />
            <h1 className="font-semibold text-2xl text-white">
              <span className="mr-1">GOOD</span>
              <span className="text-[#37BCBA]">PR</span>
            </h1>
          </div>
          <p className="font-light text-x text-gray-500">
            Track teams & members
          </p>
          <FilterToggle
            filterActive={filterActive}
            onToggle={handleFilterToggle}
          />
        </div>
      </div>
      <div className="flex flex-wrap w-full h-full items-center justify-around gap-6 p-4 sm:p-6">
        {noTeamsNeedHelp ? (
          <div className="flex items-center justify-center text-3xl text-white py-8">
            <span className="transform -rotate-90 text-6xl mr-2">🎉</span>
            All Teams on track
            <span className="text-6xl ml-2">🎉</span>
          </div>
        ) : (
          filteredGroups.map((group) => (
            <TeamCard
              key={group.id}
              group={group}
              groupStatus={group.groupStatus}
            />
          ))
        )}
      </div>
    </div>
  );
}
