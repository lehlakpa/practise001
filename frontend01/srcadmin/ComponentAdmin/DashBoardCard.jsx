export default function DashboardCard({ title, value, icon, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 border animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-gray-300 rounded w-3/4"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 border flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold mt-2">{value}</h2>
      </div>
      <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
        {icon}
      </div>
    </div>
  );
}
