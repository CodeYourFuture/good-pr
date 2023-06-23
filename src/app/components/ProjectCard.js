import Image from "next/image";
import data from "g1-e-commerce.json";

// Color for the avatar border based on the index
const avatarBorderColor = (index) => {
  const colors = [
    "border-yellow-200",
    "border-orange-600",
    "border-cyan-700",
    "border-violet-600",
    "border-yellow-700",
  ];
  const colorIndex = index % colors.length;
  return colors[colorIndex];
};

// finding the date for the last activity from the pull request
const lastActivityDate = () => {
  const pullRequests = data.pulls;
  if (pullRequests && pullRequests.length > 0) {
    const firstPullRequest = pullRequests[0];
    const updatedAt = new Date(firstPullRequest.updated_at);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = updatedAt.toLocaleDateString(undefined, options);
    return formattedDate;
  }
  return "";
};

const ProjectCard = () => {
  const currentDate = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  return (
    <div className=" flex flex-cols-1 gap-4 max-w-sm bg-[#1A1E1F] p-0 rounded-2xl">
      <div className="flex items-center gap-4">
        <div className="flex flex-col justify-between h-80 w-80 bg-[#1A1E1F] rounded-2xl p-9 ">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-s text-white">Project</h1>
            <a href="#" className="text-gray-500 text-lg ">
              ...
            </a>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="w-12 h-2 bg-yellow-300 rounded-full mx-1"></span>
            <span className="w-12 h-2 bg-yellow-300 rounded-full mx-1"></span>
            <span className="w-12 h-2 relative mx-1">
              <span className="absolute left-0 top-0 w-1/2 h-full bg-yellow-300 rounded-l-full "></span>
              <span className="absolute right-0 top-0 w-1/2 h-full bg-gray-500 rounded-r-full "></span>
            </span>
            <span className="w-12 h-2 bg-gray-500 rounded-full mx-1"></span>
          </div>{" "}
          <div className="flex just border rounded-full border-gray-600 p-1">
            {data.assignees.map((assignee, index) => (
              <Image
                key={assignee.id}
                src={assignee.avatar_url}
                width={40}
                height={40}
                alt={assignee.login}
                className={`w-11 h-11 rounded-full border-2 object-cover
                 ${avatarBorderColor(index)}
                }`}
                style={{
                  zIndex: index + 1,
                  position: "relative",
                  left: `${index * -6}%`,
                }}
              />
            ))}
            <p className="flex items-center text-white text-sm font-bold relative right-2 ">
              +4
            </p>
          </div>
          <div className="flex items-left items-center text-gray-500 text-xs text-center">
            <p className="mr-1 text-white text-sx">Last Activity: </p>
            {lastActivityDate()}
          </div>{" "}
          <button className="bg-[#37BCBA] text-black rounded-lg p-2 font-semibold">
            See All Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
