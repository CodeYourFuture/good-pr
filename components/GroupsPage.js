import React from "react";
import groupsData from "groups.json";
import TeamCard from "./TeamCard";

export default function GroupsPage() {
  const getRandomAvatar = (collaborators) => {
    const randomIndex = Math.floor(Math.random() * collaborators.length);
    return collaborators[randomIndex].avatar_url;
  };

  return (
    <div className="flex flex-row flex-wrap gap-6 relative w-full items-center justify-between">
      {groupsData.groups.map((group) => (
        <div
          key={group.id}
          className="flex  flex-wrap justify-between flex-col  mt-4 gap-4 p-6 relative items-center "
        >
          <TeamCard group={group} getRandomAvatar={getRandomAvatar} />
        </div>
      ))}
    </div>
  );
}
