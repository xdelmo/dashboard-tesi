interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      // Order Statuses
      case "Pagato":
        return "bg-emerald-100 text-emerald-700";
      case "In Attesa":
        return "bg-amber-100 text-amber-700";
      case "Annullato":
        return "bg-red-100 text-red-700";

      // Customer Statuses
      case "Attivo":
        return "bg-emerald-100 text-emerald-700";
      case "Inattivo":
        return "bg-red-100 text-red-700";

      // Product Statuses
      case "Bozza":
        return "bg-gray-100 text-gray-700";
      case "Disattivato":
        return "bg-red-100 text-red-700";

      // Product Categories
      case "Cloud":
        return "bg-blue-50 text-blue-700";
      case "Analytics":
        return "bg-purple-50 text-purple-700";
      case "AI":
        return "bg-indigo-50 text-indigo-700";

      default:
        // Default / Fallback
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(
        status
      )}`}
    >
      {status}
    </span>
  );
}
