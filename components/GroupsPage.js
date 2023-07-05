"use client";
import React, { useEffect, useState } from "react";

function MyComponent() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/repositories");
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(repos);

  return (
    <div>
      {repos.map((repo) => (
        <div key={repo.id}>
          <h2>{repo.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default MyComponent;
