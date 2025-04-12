import React from 'react';

export default function StartPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Kubernetes Namespace Git Transfer</h1>
      <div className="prose">
        <p>
          This application is designed to facilitate the management and versioning of Kubernetes namespace definitions by transferring them into a Git repository. 
          It simplifies the process of backing up, restoring, and sharing namespace configurations.
        </p>
        <p>
          Key features of this application include:
        </p>
        <ul>
          <li>
            <strong>Connection to Two Kubernetes Clusters:</strong> The application can connect to two distinct Kubernetes clusters, allowing you to manage namespaces across different environments.
          </li>
          <li>
            <strong>Namespace Dumping:</strong> You can dump the entire contents of a selected namespace from a Kubernetes cluster into a GitHub project. This includes all resources and configurations within the namespace.
          </li>
          <li>
            <strong>Git Integration:</strong> The application seamlessly integrates with Git, allowing you to store and version your Kubernetes namespace definitions in a repository like GitHub.
          </li>
          <li>
            <strong>Configuration Menu:</strong> A dedicated configuration menu is provided to securely store and manage the secrets required for:
            <ul>
              <li>Connecting to the specified Kubernetes clusters.</li>
              <li>Authenticating with the Git repository (e.g., GitHub).</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}