import Sidebar from "@/components/Sidebar";
import { getCurrentUser } from "@/app/actions/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="flex h-screen bg-slate-50">
      <div className="hidden md:flex md:w-64 md:flex-col fixed inset-y-0 text-white">
        <Sidebar user={user} />
      </div>
      <div className="flex flex-col flex-1 md:pl-64 transition-all duration-300">
        <main className="flex-1 py-8 px-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
