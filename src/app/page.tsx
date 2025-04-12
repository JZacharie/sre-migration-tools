import React from 'react';

export default function Home() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-6">Namespace Git Transfer</h1>

            <div className="prose max-w-full">
                <p className="text-lg">
                    Welcome to Namespace Git Transfer, an application designed to streamline the management of your Kubernetes namespaces by bridging the gap between your Kubernetes clusters and your Git repositories.
                </p>
                <p className="text-lg">
                    This application enables you to connect to two separate Kubernetes clusters, extract namespace definitions, and seamlessly integrate them into a Git repository such as GitLab.
                </p>
                <ul className="list-disc list-inside text-lg">
                    <li>Connect to multiple Kubernetes clusters.</li>
                    <li>Extract (dump) namespace definitions.</li>
                    <li>Integrate with Git repositories for version control.</li>
                    <li>Access a configuration menu to customize your setup.</li>
                </ul>
            </div>
        </div>
    );
}
