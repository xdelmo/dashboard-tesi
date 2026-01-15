"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { logout } from "@/app/actions/auth";

interface HeaderProfileProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  } | null;
}

export default function HeaderProfile({ user }: HeaderProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <div
        className="flex items-center gap-3 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="hidden md:flex justify-center">
          {user.avatar ? (
            <div className="w-10 h-10 relative">
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex flex-col text-left leading-tight">
          <span className="font-semibold text-slate-800 text-sm">
            {user.name}
          </span>
          <span className="text-xs text-slate-500 uppercase tracking-wide">
            {user.role || "Developer"}
          </span>
        </div>

        <i
          className={`pi pi-chevron-down text-xs text-slate-400 ml-1 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        ></i>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg p-1 z-50 border border-slate-100  animate-in fade-in zoom-in-95 duration-100">
          <button
            onClick={() => logout()}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 group"
          >
            <i className="pi pi-power-off text-red-500"></i>
            <span className="font-medium">Esci</span>
          </button>
        </div>
      )}
    </div>
  );
}
