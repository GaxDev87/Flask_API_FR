import React from "react";
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full border-r-lime-500 font-mono">
      {children}
    </div>
  );
}
