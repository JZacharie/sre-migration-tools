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
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGitConfig({
      ...gitConfig,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    Cookies.set("gitConfig", JSON.stringify(gitConfig), { expires: 365 });
    alert("Git configuration saved!");
  };

  return (
    <div className="p-8 form-container">
      <h1 className="text-2xl font-bold mb-6 text-center">Git Repository Configuration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="repository-url" className="block mb-1">
            Repository URL
          </label>
          <input
            type="text"
            id="repository-url"
            value={gitConfig.repository}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="branch-name" className="block mb-1">
            Branch Name
          </label>
          <input
            type="text"
            id="branch-name"
            value={gitConfig.branch}
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