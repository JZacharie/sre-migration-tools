// src/app/kubernetes/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useKubeConfig } from '../../context/KubeConfigContext';

interface KubernetesObject {
  apiVersion: string;
  kind: string;

  metadata: {
    name: string;
    namespace?: string;
  };
}

const KubernetesPage = () => {
  const { kubeconfig } = useKubeConfig();
  const [namespaces, setNamespaces] = useState<string[]>([]);
  const [namespaceObjects, setNamespaceObjects] = useState<{ [namespace: string]: KubernetesObject[] }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("kubeconfig context:", kubeconfig);
  }, [kubeconfig]);

  useEffect(() => {
    const fetchNamespaces = async () => {
      if (kubeconfig === null) {
        setError('Kubeconfig not loaded yet.');
        return;
      }

      const kubeconfigCookie = Cookies.get('kubeconfig');
      if (!kubeconfigCookie) {
        setError('Kubeconfig not found. Please configure Kubernetes connection.');
        return;
      }

      try {
        const response = await fetch('/api/kubernetes/namespaces', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'kubeconfig': kubeconfigCookie
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch namespaces');
        }
        const data = await response.json();
        setNamespaces(data.namespaces);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchNamespaces();
  }, []);

  const fetchNamespaceObjects = async (namespace: string) => {
    if (kubeconfig === null) {
      setError('Kubeconfig not loaded yet.');
      return;
    }

    const kubeconfigCookie = Cookies.get('kubeconfig');
    if (!kubeconfigCookie) {
      setError('Kubeconfig not found. Please configure Kubernetes connection.');
      return;
    }
    try {
      const response = await fetch(`/api/kubernetes/objects?namespace=${namespace}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'kubeconfig': kubeconfigCookie
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch objects');
      }

      const data = await response.json();
      setNamespaceObjects(prev => ({ ...prev, [namespace]: data.objects }));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kubernetes Namespaces</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {namespaces.length > 0 ? (
        <ul className="space-y-2">
          {namespaces.map(namespace => (
            <li key={namespace} className="border p-2 rounded">
              <div className="flex justify-between items-center">
                <span className="font-medium">{namespace}</span>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => fetchNamespaceObjects(namespace)}
                >
                  Show Objects
                </button>
              </div>
              {namespaceObjects[namespace] && (
                <div className="mt-2">
                  <h3 className="font-bold">Objects in {namespace}:</h3>
                  <ul>
                    {namespaceObjects[namespace].map((obj, index) => (
                      <li key={index}>{obj.kind}: {obj.metadata.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No namespaces found.</p>
      )}
    </div>
  );
};

export default KubernetesPage;