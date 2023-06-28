// const { Octokit } = require("@octokit/rest");

// // eslint-disable-next-line import/no-anonymous-default-export
// export default async (req, res) => {
//   const octokit = new Octokit({
//     auth: process.env.GITHUB_AUTH_TOKEN,
//   });

//   const owner = "nataliiazab";
//   const repository = "good-pr";

//   try {
//     const [repo, assignees, issuesClosed, issuesOpen] = await Promise.all([
//       octokit.request(`GET /repos/${owner}/${repository}`),
//       octokit.request(`GET /repos/${owner}/${repository}/assignees`),
//       octokit.request(`GET /repos/${owner}/${repository}/issues`, {
//         state: "closed",
//       }),
//       octokit.request(`GET /repos/${owner}/${repository}/issues`),
//     ]);

//     const contributorsNames = assignees.data.map((el) => el.login);

//     const pr = await Promise.all(
//       contributorsNames.map((contributorName) =>
//         octokit.request("GET /search/issues", {
//           q: `is:pr repo:${owner}/${repository} author:${contributorName}`,
//         })
//       )
//     );

//     return res
//       .status(200)
//       .json([
//         repo.data,
//         assignees.data,
//         issuesClosed.data,
//         issuesOpen.data,
//         pr.map((el) => el.data),
//       ]);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return res.status(500).json({ error: "Error fetching data" });
//   }
// };

const { Octokit } = require("@octokit/rest");

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
  });

  const owner = "nataliiazab";
  const repository = "good-pr";

  try {
    const [repoData, assigneesData, issuesData] = await Promise.all([
      octokit.request(`GET /repos/${owner}/${repository}`),
      octokit.request(`GET /repos/${owner}/${repository}/assignees`),
      octokit.request(`GET /repos/${owner}/${repository}/issues`, {
        state: "all",
      }),
    ]);

    const contributorsNames = assigneesData.data.map((el) => el.login);

    const [issuesClosedData, issuesOpenData, prData] = await Promise.all([
      octokit.request(`GET /repos/${owner}/${repository}/issues`, {
        state: "closed",
      }),
      octokit.request(`GET /repos/${owner}/${repository}/issues`, {
        state: "open",
      }),
      Promise.all(
        contributorsNames.map((contributorName) =>
          octokit.request("GET /search/issues", {
            q: `is:pr repo:${owner}/${repository} author:${contributorName}`,
          })
        )
      ),
    ]);

    return res
      .status(200)
      .json([
        repoData.data,
        assigneesData.data,
        issuesClosedData.data,
        issuesOpenData.data,
        prData.map((el) => el.data),
      ]);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Error fetching data" });
  }
};
