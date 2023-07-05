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

  console.log(groups);

  return (
    <div>
      {groups.map((group) => (
        <TeamCard group={group} />
      ))}
    </div>
  );
}

export default GroupsPage;
