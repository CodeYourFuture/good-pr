export default function TeamCard() {
  return (
    <div className="bg-[#FFFFFF] p-3 w-[360px] h-[370px] rounded-2xl flex flex-col shadow-[0px_5px_20px_2px_rgba(0,_0,_0,_0.25),_0px_6px_10px_0px_rgba(0,_0,_0,_0.14)]">
      <div className="bg-[#F6F8FA] rounded-2xl flex flex-col items-center justify-center flex-2 h-2/3">
        <img
          className="w-[100px] h-[100px] rounded-full  mb-3"
          src="https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
          alt="Placeholder Image"
        />
        <div className="text-center text-[18px] text-black font-semibold">
          Team Innovators
        </div>
        <div className="text-center text-black text-[18px] font-semibold mt-1">
          Good PR
        </div>
      </div>
      <div className="bg-[#FFFFFF] flex flex-row items-end justify-center flex-1 h-1/3 mb-2">
        <div className="flex-1">
          <div className="text-center text-[18px] font-semibold">
            Last Updated:
          </div>
          <div className="text-center text-[18px] font-bold">15 June 2023 </div>
        </div>
        <div className="flex-1 ">
          <div className="text-center text-[18px] font-semibold">
            Pull Requests:
          </div>
          <div className="text-center text-[18px] font-bold">15</div>
        </div>
      </div>
    </div>
  );
}
