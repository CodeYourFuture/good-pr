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
          className="flex  flex-nowrap justify-between flex-col  mr-px gap-2 relative items-center "
        >
          <TeamCard group={group} getRandomAvatar={getRandomAvatar} />
        </div>
      ))}
    </div>
  );
}
