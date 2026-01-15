"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";

const navItems = [
  { name: "Dashboard", href: "/", icon: "pi pi-th-large" },
  { name: "Clienti", href: "/customers", icon: "pi pi-users" },
];

interface SidebarProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="h-20 flex items-center justify-center border-b border-gray-100">
        <Link
          href="/"
          className="flex items-center justify-center relative w-full h-full px-6"
        >
          <Image
            src="/images/logo-transparent-bg.png"
            alt="ApexFlow Logo"
            width={150}
            height={48}
            className="object-contain w-auto h-12"
            priority
          />
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <div className="px-2 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
          Menu Principale
        </div>

        {navItems.slice(0, 1).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 font-semibold"
                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              <i className={`${item.icon} text-lg`}></i>
              <span className="text-base">{item.name}</span>
            </Link>
          );
        })}

        <div className="px-2 pt-4 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
          Gestione
        </div>

        {navItems.slice(1).map((item) => {
          const isActive = pathname.startsWith(item.href) && item.href !== "/";
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 font-semibold"
                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              <i className={`${item.icon} text-lg`}></i>
              <span className="text-base">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 space-y-4">
        {user && (
          <>
            <div className="flex items-center gap-3 px-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold shrink-0">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <button
                onClick={() => logout()}
                className="flex items-center gap-3  px-4 py-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all text-sm group"
              >
                <i className="pi pi-sign-out text-lg group-hover:text-red-500"></i>
              </button>
            </div>
          </>
        )}
      </div>
      <div className="p-4 border-t border-gray-100 space-y-4"></div>
    </div>
  );
}
