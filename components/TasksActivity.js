"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faCodePullRequest,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";


// Color for the avatar border based on the assignee's ID
const avatarBorderColor = (assigneeId) => {
  const colors = [
    // "border-yellow-200",
    // "border-orange-600",
    // "border-cyan-700",
    // "border-violet-600",
    // "border-yellow-700",
    "border-gray-500",
  ];
  const colorIndex = assigneeId % colors.length;
  return colors[colorIndex];
};

export default function TaskActivity({ issuesClosed, allIssues, repo, pr }) {
  const [activeTab, setActiveTab] = useState("issues"); // State to track the active tab

  //grab issues Closed and Issues open in the same array to map for the table
  const issuesArr = [];
  issuesClosed.map((el) => el.items.map((e) => issuesArr.push(e)));
  const issues = [...issuesArr, ...allIssues];
  //sort the array based on the issues number
  issues.sort((a, b) => b.number - a.number);

  //repeat the process for pr
  const prArray = [];
  pr.map((el) => el.items.map((e) => prArray.push(e)));

  return (
    <div className="p-6 w-full h-full min-h-max ">
      <div className="flex justify-between items-center">
        <div className="flex text-white font-bold relative py-4">
          Tasks Activities
        </div>
        <div className="flex text-white font-bold relative gap-4 py-4">
          <FontAwesomeIcon
            icon={faListCheck}
            className={`h-6 w-6 ${
              activeTab === "issues"
                ? "text-gray-900 bg-[#37BCBA]"
                : "text-white bg-[#1A1E1F] cursor-pointer hover:bg-[#37BCBA]"
            } rounded-md p-2 transition duration-300`}
            onClick={() => setActiveTab("issues")}
          />
          <FontAwesomeIcon
            icon={faCodePullRequest}
            className={`h-6 w-6 ${
              activeTab === "pr"
                ? "text-gray-900 bg-[#37BCBA]"
                : "text-white bg-[#1A1E1F] cursor-pointer hover:bg-[#37BCBA]"
            } rounded-md p-2 transition duration-300`}
            onClick={() => setActiveTab("pr")}
          />
        </div>
      </div>

      <div className="relative flex justify-center bg-[#1A1E1F] rounded-2xl overflow-scroll w-full h-full mb-6">
        <div className="absolute flex justify-start top-0 w-full px-4 mb-10  min-h-fit">
          <table className="table-auto text-white text-xs text-left w-full ">
            <thead className="sticky top-0">
              <tr className=" text-sm font-normal bg-[#1A1E1F] h-20">
                <th className="">Assigned to</th>
                <th>Last Update</th>
                <th>Task</th>
                <th>Status</th>
                <th>Project</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="py-4 text-white divide-y divide-gray-900">
              {activeTab === "issues" &&
                issues.map((el, idx) =>
                  el.assignees.length > 0 ? (
                    <tr key={idx}>
                      <td className="py-4 min-w-[170px] whitespace-nowrap">
                        <span className="flex flex-row items-center">
                          <Image
                            src={el.assignees[0].avatar_url}
                            width={40}
                            height={40}
                            alt={el.assignees[0].login}
                            className={`w-10 h-10 rounded-full border-2 object-cover ${avatarBorderColor(
                              idx
                            )}`}
                          />
                          <span className="pl-2 font-medium text-[1.2em] min-w-max">
                            {el.assignees[0].login}
                          </span>
                        </span>
                      </td>
                      <td className="pr-4 py-4 max-w-min whitespace-nowrap">
                        {el.updated_at.slice(0, 16).replace("T", " ")}
                      </td>
                      <td className="pr-6 py-4 max-w-[220px] truncate">
                        {el.title}
                      </td>
                      <td className="pr-4 min-w-max whitespace-nowrap">
                        <span
                          className={`px-4 py-3 rounded-full font-semibold text-xs ${
                            el.state === "open"
                              ? "text-[#bc8d5e] bg-[#282e16]"
                              : "text-[#b9c170] bg-[#122a29]"
                          }`}
                        >
                          {el.state === "open" ? "In progress" : "Done"}
                        </span>
                      </td>
                      <td className="pr-4 py-4 min-w-full whitespace-nowrap">
                        {repo.name}
                      </td>
                      <td className="text-right min-w-max whitespace-nowrap">
                        <a
                          href={el.html_url}
                          target="_blank"
                          className="py-3 px-6  bg-[#2b3234] border-none hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                        >
                          See Details
                        </a>
                      </td>
                    </tr>
                  ) : null
                )}
              {activeTab === "pr" &&
                prArray.map((el, idx) => (
                  <tr key={idx}>
                    <td className="py-4 min-w-[170px] whitespace-nowrap">
                      <span className="flex flex-row items-center">
                        <Image
                          src={el.user.avatar_url}
                          width={40}
                          height={40}

                          alt={el.user.login}
                          className={`w-10 h-10 rounded-full border-2 object-cover ${avatarBorderColor(
                            idx
                          )}`}
                        />
                        <span className="pl-2 font-medium text-[1.2em] min-w-max">
                          {el.user.login}
                        </span>
                      </span>
                    </td>
                    <td className="pr-4 py-4 max-w-min whitespace-nowrap">
                      {el.updated_at.slice(0, 16).replace("T", " ")}
                    </td>
                    <td className="pr-6 py-4 max-w-[220px] truncate">
                      {el.title}
                    </td>
                    <td className="pr-4 min-w-max whitespace-nowrap">
                      <span
                        className={`px-4 py-3 rounded-full font-semibold text-xs ${
                          el.state === "open"
                            ? "text-[#bc8d5e] bg-[#282e16]"
                            : "text-[#b9c170] bg-[#122a29]"
                        }`}
                      >
                        {el.state === "open" ? "In Review" : "Merged"}
                      </span>
                    </td>
                    <td className="pr-4 py-4 min-w-full whitespace-nowrap">
                      {repo.name}
                    </td>
                    <td className="text-right min-w-max whitespace-nowrap">
                      <a
                        href={el.html_url}
                        target="_blank"
                        className="py-3 px-6 bg-[#2b3234] border-none hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                      >
                        See Details
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="sticky bg-gray-600 h-[1px] top-20 w-full m-4"></div>
      </div>
    </div>
  );
}
