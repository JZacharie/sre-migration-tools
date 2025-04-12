"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function DashboardPage() {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);

  useEffect(() => {
    const dashboardConfig = Cookies.get("dashboardConfig");
    if (dashboardConfig) {
      const config = JSON.parse(dashboardConfig);
      setIframeUrl(config.url);
    }
  }, []);

  return (
    <div className="w-screen h-screen">
      {iframeUrl ? (
        <iframe
          src={iframeUrl}
          className="w-full h-full"
          title="Dashboard"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          No Dashboard URL configured.
        </div>
      )}
    </div>
  );
}