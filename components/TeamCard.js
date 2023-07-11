"use client";
import Link from "next/link";

export default function TeamCard({ group, color }) {
  const lastActivityDate = (repo) => {
    if (repo.updated_at) {
      const updatedAt = new Date(repo.updated_at);
      const options = { day: "numeric", month: "long", year: "numeric" };
      const formattedDate = updatedAt.toLocaleDateString(undefined, options);
      return formattedDate;
    }
    return "";
  };

  return (
    <div className="flex flex-col justify-around  mb-[5%] gap-4 h-[350px] w-[400px] shadow-[0_0px_20px_-5px_white] font-normal max-w-sm bg-[#1a1e1f] text-white rounded-2xl">
      <Link href={`/dashboard?id=${group.id}`}>
        <div className="bg-[#070e0e] rounded-2xl  flex flex-col items-center justify-center flex-2 h-2/3 p-2">
          <svg
            className={`h-22 w-20 text-[${color}] shadow-[0_0px_30px_-5px_white] rounded-full m-[2%]`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              className="fill-current"
              d="M12 0a12 12 0 00-3.91 23.38c.62.12.84-.27.84-.6l-.02-2.1c-3.44.75-4.18-1.66-4.18-1.66-.57-1.46-1.4-1.85-1.4-1.85-1.14-.78.09-.76.09-.76 1.27.09 1.94 1.31 1.94 1.31 1.13 1.94 2.97 1.38 3.69 1.06.11-.82.44-1.38.8-1.7-2.81-.32-5.75-1.4-5.75-6.22 0-1.37.49-2.48 1.31-3.36-.13-.32-.57-1.59.12-3.31 0 0 1.05-.34 3.44 1.28a11.98 11.98 0 016 0c2.39-1.62 3.44-1.28 3.44-1.28.69 1.73.25 2.99.12 3.31.81.88 1.31 1.99 1.31 3.36 0 4.83-2.94 5.89-5.76 6.2.45.38.85 1.15.85 2.32l-.01 3.44c0 .33.22.72.85.6A12 12 0 0012 0z"
            />
          </svg>
          <div className="text-center text-[18px] text-white">
            {group.team_name}
          </div>
          <div className="text-center text-white text-[18px]  mt-1">
            {group.name}
          </div>
        </div>
        <div className="bg-[#1a1e1f] flex flex-row items-end justify-center flex-1 h-1/3 mb-2 py-[5%]">
          <div className="flex-1">
            <div className="text-center  ">{lastActivityDate(group)} </div>

            <div className="text-center text-[14px] text-[#606467] font-light">
              Last Update
            </div>
          </div>
          <div className="flex-1 ">
            <div className="text-center ">
              <p>{group.total_prs}</p>
            </div>
            <div className="text-center text-[14px] text-[#606467] font-light">
              Pull Requests
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
