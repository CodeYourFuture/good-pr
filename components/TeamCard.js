import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faOctopusDeploy,
  faPagelines,
} from "@fortawesome/free-brands-svg-icons";
import {
  faExternalLinkSquareAlt,
  faLinkSlash,
  faShapes,
} from "@fortawesome/free-solid-svg-icons";

export default function TeamCard({ group }) {
  const [prsDoneCount, setPrsDoneCount] = useState(0);

  useEffect(() => {
    if (prsDoneCount < group.total_prs) {
      const interval = setInterval(() => {
        setPrsDoneCount((prevCount) => {
          const newCount = prevCount + 1;
          if (newCount >= group.total_prs) {
            clearInterval(interval);
            return group.total_prs;
          }
          return newCount;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [group.total_prs]);

  const lastActivityDate = (repo) => {
    if (repo.updated_at) {
      const updatedAt = new Date(repo.updated_at);
      const options = { day: "numeric", month: "long", year: "numeric" };
      const formattedDate = updatedAt.toLocaleDateString(undefined, options);
      return formattedDate;
    }
    return "";
  };

  useEffect(() => {
    const handleTooltips = async () => {
      const module = await import("@components/Tooltips");
      if (module && module.handleTooltips) {
        module.handleTooltips();
      }
    };

    handleTooltips();
  }, []);

  const tooltipDemoId = `tooltip-demo-url-${group.id}`;
  const tooltipGithubId = `tooltip-github-url-${group.id}`;

  return (
    <div className="flex flex-col justify-around p-1 min-w-full sm:min-w-[345px] md:min-w-[370px] lg:min-w-[380px] h-[fit-content] bg-[#1a1e1f] text-white rounded-2xl shadow-[0_0_10px_-5px_white] transition-all duration-300 hover:transform hover:scale-105 hover:shadow-[0_0_15px_-7px_white]">
      <Link href={`/dashboard?id=${group.id}`}>
        <div className="flex flex-col items-center justify-center p-4 bg-[#070e0ea8] rounded-t-lg ">
          <div className="w-20 h-20 border-t-[3px] border-r-[3px] rounded-full bg-[#37BCBA] overflow-hidden">
            <img
              key={group.id}
              src={`https://robohash.org/${group.id}.png`}
              alt="Avatar"
              layout="responsive"
              width={100}
              height={100}
            />
          </div>
          <div className="text-center text-xl text-white p-2">
            {group.team_name}
          </div>
        </div>
      </Link>
      <div className="flex justify-center items-center flex-1 h-1/3 py-6">
        <div className="flex-1">
          <p className="text-center text-lg">{lastActivityDate(group)}</p>
          <div className="text-center text-sm text-[#606467] font-light">
            Last Update
          </div>
        </div>
        <div className="flex-1">
          <div className="text-center text-base">
            <p className="text-xl">{prsDoneCount}</p>
          </div>
          <div className="text-center text-sm text-[#606467] font-light">
            Pull Requests
          </div>
        </div>
      </div>
      <div className="">
        <ul className="flex items-center justify-around p-4">
          <li className="">
            <a
              href={group.demo_url}
              target="_blank"
              className="flex items-center text-sx text-white font-light"
            >
              <FontAwesomeIcon
                icon={faShapes}
                className="text-white h-[35px] transition duration-300 hover:scale-110 hover:text-[#37BCBA]"
                data-tooltip-target={tooltipDemoId}
                data-tooltip-placement="button"
              />
            </a>
            <div
              id={tooltipDemoId}
              role="tooltip"
              className="absolute z-10 left-8 button-8 invisible p-2 mx-6 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip border border-slate-100 dark:bg-[#1A1E1F]"
            >
              Live demo
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </li>
          <li className="">
            <a
              href={group.github_url}
              target="_blank"
              className="flex items-center text-sx text-white font-light"
            >
              <FontAwesomeIcon
                icon={faGithub}
                className="text-white h-[40px] transition duration-300 hover:scale-110 hover:text-[#37BCBA]"
                data-tooltip-target={tooltipGithubId}
                data-tooltip-placement="button"
              />
            </a>
            <div
              id={tooltipGithubId}
              role="tooltip"
              className="absolute z-10 right-2 button-8 invisible inline-block p-2 mx-6 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip border border-slate-100 dark:bg-[#1A1E1F]"
            >
              GitHub repository
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
