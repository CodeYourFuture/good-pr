import OverallInfoCard from "./OverallInfoCard";
import ProjectCard from "./ProjectCard";
import TaskActivity from "./TasksActivity";
import TeamActivity from "./TeamActivity";

const TeamOverview = () => {
  return (
    <div class=" p-6">
      {/* Content for the right div */}
      <h1 className="font-bold text-white p-4 ">Team Overview</h1>
      <p className="font-light	text-xs	text-gray-600	pt-1 p-4 ">
        Track you projects, tasks & team activity here
      </p>
      <div className=" flex flex-nowrap justify-between mt-4 gap-4 p-6 ">
        <ProjectCard />
        <OverallInfoCard />
        <TeamActivity />
      </div>

      <TaskActivity />
    </div>
  );
};

export default TeamOverview;