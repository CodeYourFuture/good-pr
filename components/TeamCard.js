export default function TeamCard({ group, getRandomAvatar }) {
  return (
    <div className="bg-[#717578] p-3 w-[360px] h-[370px] rounded-2xl flex flex-col shadow-[0px_5px_20px_2px_rgba(0,_0,_0,_0.25),_0px_6px_10px_0px_rgba(0,_0,_0,_0.14)]">
      <div className="bg-[#1A1E1F] rounded-2xl flex flex-col items-center justify-center flex-2 h-2/3">
        <img
          className="w-[100px] h-[100px] rounded-full  mb-3 border-4
    border-white-400"
          src={getRandomAvatar(group.collaborators)}
          alt="Placeholder Image"
        />
        <div className="text-center text-[18px] text-[#FFFFFF] font-semibold">
          {group.groupName}
        </div>
        <div className="text-center text-[#FFFFFF]  text-[18px] font-semibold mt-1">
          {group.projectName}
        </div>
      </div>
      <div className="bg-[#717578] flex flex-row items-end justify-center flex-1 h-1/3 mb-2">
        <div className="flex-1">
          <div className="text-center text-[18px] font-semibold">
            Last Updated:
          </div>
          <div className="text-center text-[18px] font-bold">
            {group.updatedDate}
          </div>
        </div>
        <div className="flex-1 ">
          <div className="text-center text-[18px] font-semibold">
            Pull Requests:
          </div>
          <div className="text-center text-[18px] font-bold ">
            {group.pullRequests}
          </div>
        </div>
      </div>
    </div>
  );
}
