export default function TeamCard({ group, getRandomAvatar }) {
  const lastActivityDate = () => {
    if (group.updatedDate) {
      const updatedAt = new Date(group.updatedDate);
      const options = { day: "numeric", month: "long", year: "numeric" };
      const formattedDate = updatedAt.toLocaleDateString(undefined, options);
      return formattedDate;
    }
    return "";
  };

  return (
    <div className=" flex flex-col justify-between mt-4 gap-4 p-6 h-80 w-[22rem] shadow-[0_0px_20px_-5px_white] font-normal max-w-sm bg-[#1a1e1f]  text-white  rounded-2xl">
      <div className="bg-[#070e0e] rounded-2xl flex flex-col items-center justify-center flex-2 h-2/3">
        <img
          className="w-[100px] h-[100px] rounded-full  mb-3"
          src={getRandomAvatar(group.collaborators)}
          alt="Placeholder Image"
        />
        <div className="text-center text-[18px] text-white ">
          {group.groupName}
        </div>
        <div className="text-center text-white text-[18px]  mt-1">
          {group.projectName}
        </div>
      </div>
      <div className="bg-[#1a1e1f] flex flex-row items-end justify-center flex-1 h-1/3 mb-2">
        <div className="flex-1">
          <div className="text-center  ">{lastActivityDate()}</div>
          <div className="text-center text-[14px] text-[#606467] font-light">
            Last Update
          </div>
        </div>
        <div className="flex-1 ">
          <div className="text-center ">
            <p>{group.pullRequests}</p>
          </div>
          <div className="text-center text-[14px] text-[#606467] font-light">
            Pull Requests
          </div>
        </div>
      </div>
    </div>
  );
}
