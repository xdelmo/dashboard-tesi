import React, { PropsWithChildren } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({
  title,
  subtitle,
  children,
}: PropsWithChildren<PageHeaderProps>) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        {subtitle && <p className="text-slate-500 mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">{children}</div>
    </header>
  );
}
