// src/context/KubeConfigContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface KubeConfigContextProps {
  kubeconfig: string | null;
  setKubeconfig: (config: string | null) => void;
}

export const KubeConfigContext = createContext<KubeConfigContextProps | undefined>(undefined);

export const KubeConfigProvider = ({ children }: { children: ReactNode }) => {
  const initialKubeconfig = Cookies.get('kubeconfig') ? Cookies.get('kubeconfig') : null;
  const [kubeconfig, setKubeconfigState] = useState<string | null>(initialKubeconfig ? initialKubeconfig: null);

  const setKubeconfig = (config: string | null) => {
    setKubeconfigState(config);
    if (config) {
      Cookies.set('kubeconfig', config, { expires: 7 });
    } else {
      Cookies.remove('kubeconfig');
    }
  };

  const value: KubeConfigContextProps = {
    kubeconfig,
    setKubeconfig,
  };

  return (
    <KubeConfigContext.Provider value={value}>
      {children}
    </KubeConfigContext.Provider>
  );
};

export const useKubeConfig = (): KubeConfigContextProps => {
  const context = useContext(KubeConfigContext);
  if (context === undefined) {
    throw new Error('useKubeConfig must be used within a KubeConfigProvider');
  }
  return context;
};