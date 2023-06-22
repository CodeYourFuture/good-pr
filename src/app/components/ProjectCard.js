const ProjectCard = () => {
  return (
    <div className="flex flex-col gap-6 pt-10 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex flex-col justify-between h-[250px] bg-[#1A1E1F] rounded-2xl p-4 ">
            <h1 className="font-bold text-sm text-white">Project</h1>
            <button className="bg-[#37BCBA] text-black rounded-lg p-2 pl-6 pr-6">
              See All Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
