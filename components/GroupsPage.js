"use client";
import { Yellowtail } from "next/font/google";
import React, { useEffect, useState } from "react";
import TeamCard from "./TeamCard";

function GroupsPage() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/repositories");
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const oneGroup = groups;

  console.log("lc", oneGroup[0]);

  return (
    <div>
      {groups.map((group) => (
        <TeamCard group={oneGroup} />
      ))}
      {/* <TeamCard group={oneGroup[0]} /> */}
    </div>
  );
}

export default GroupsPage;
