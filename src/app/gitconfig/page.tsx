"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";


interface GitConfig {
  repository: string;
  branch: string;
  user: string;
  token: string;
}

const GitConfigPage: React.FC = () => {
  const [branches, setBranches] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [gitConfig, setGitConfig] = useState<GitConfig>({
    repository: "",
    branch: "",
    user: "",
    token: "",
  });

  useEffect(() => {
    const savedConfig = Cookies.get("gitConfig");
    if (savedConfig) {
      setGitConfig(JSON.parse(savedConfig));
    }
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    if (gitConfig.repository) {
        try {
            const response = await fetch(`/api/branches?repository=${encodeURIComponent(gitConfig.repository)}`);
            if (response.ok) {
                const data = await response.json();
                setBranches(data);
            } else {
                console.error("Failed to fetch branches");
            }
        } catch (error) {
            console.error("Error fetching branches:", error);
        }
    }
};

 const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;

    if (id === "repository") {
        setGitConfig({ ...gitConfig, repository: value });
    }
    setGitConfig({
      ...gitConfig,
        [id]: value,
    });


  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);
    try {
      const response = await fetch("/api/test-git", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gitConfig),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to test Git connection.");
      }
      Cookies.set("gitConfig", JSON.stringify(gitConfig), { expires: 365 });
      alert("Git configuration saved!");
    } catch (error: any) {
        
      setErrorMessage(error.message);
      console.error("Error testing Git connection:", error);
    }
  };


  return (
    <div className="p-8 form-container">
      <h1 className="text-2xl font-bold mb-6 text-center">Git Repository Configuration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="repository" className="block mb-1">
            Repository URL
          </label>
          <input
            type="text"
            id="repository"
            placeholder="https://gitlab.com/your-group/your-repo.git"
            value={gitConfig.repository}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="user" className="block mb-1">
            User
          </label>
          <input
            type="text"
            id="user"
            value={gitConfig.user}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="token" className="block mb-1">
            Token
          </label>
          <input
            type="password"
            id="token"
            value={gitConfig.token}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="branch" className="block mb-1">
            Branch Name
          </label>
          <select
            id="branch"
            value={gitConfig.branch}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          >
            <option value="">Select a branch</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>{branch}</option>
            ))}          
          </select>
          />
        </div>
        {errorMessage && (
          <div className="text-red-500">{errorMessage}</div>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Configuration
        </button>
      </form>
    </div>
  );
};

export default GitConfigPage;