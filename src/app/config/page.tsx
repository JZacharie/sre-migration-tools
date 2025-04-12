'use client';

import React, { useState, useEffect } from 'react';
import { useKubeConfig } from '@/context/KubeConfigContext';
import Cookies from 'js-cookie';

export default function ConfigPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const { setKubeconfig } = useKubeConfig();  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;        
        setFileContent(content);
        setKubeconfig(content);        
        Cookies.set('kubeconfig', JSON.stringify({ kubeconfigContent: content }));
      };
      reader.readAsText(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile && fileContent) {        
        
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kubernetes Server Configuration</h1>
      <div className="border p-4 rounded">
        <h2 className="text-lg font-semibold mb-4">Upload kubeconfig file</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="kubeconfigFile" className="block mb-2">
              kubeconfig file
            </label>            
            <input
              type="file"
              id="kubeconfigFile"
              accept=".kube/config, .yaml, .yml"
              onChange={handleFileChange}
              className="border rounded p-2 w-full"
              />
          </div>
          {selectedFile && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">File Content:</h3>
                <pre className="bg-gray-100 p-4 rounded overflow-auto whitespace-pre-wrap">
                    {fileContent}
                </pre>
              </div>
          )}
          <button
              type="submit"
              onClick={handleUpload}
              disabled={!selectedFile}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload Kubeconfig</button>
        </form>
      </div>
    </div>
  );
}