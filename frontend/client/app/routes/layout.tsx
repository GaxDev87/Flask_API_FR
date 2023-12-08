import React from "react";
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full border-r-indigo-600 font-mono">
      {children}
    </div>
  );
}
