import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  colorClass: "blue" | "purple" | "green" | "orange";
  subText?: string;
}

const gradientClasses = {
  blue: "bg-gradient-to-br from-[#4facfe] to-[#00f2fe]",
  purple: "bg-gradient-to-br from-[#a18cd1] to-[#fbc2eb]",
  green: "bg-gradient-to-br from-[#43e97b] to-[#38f9d7]",
  orange: "bg-gradient-to-br from-[#fa709a] to-[#fee140]",
};

export default function StatCard({
  title,
  value,
  icon,
  colorClass,
  subText,
}: StatCardProps) {
  return (
    <div
      className={`${gradientClasses[colorClass]} rounded-2xl p-6 text-white shadow-lg hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden`}
    >
      <div className="flex justify-between items-center relative z-10">
        <div>
          <span className="block mb-2 text-sm font-medium opacity-90">
            {title}
          </span>
          <h3 className="text-3xl font-bold mb-1">{value}</h3>
          {subText && <span className="text-xs opacity-80">{subText}</span>}
        </div>
        <div className="opacity-80">
          <i className={`pi ${icon} text-[2.5rem]`}></i>
        </div>
      </div>
    </div>
  );
}
