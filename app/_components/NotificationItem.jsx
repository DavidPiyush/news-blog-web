import { format } from "date-fns";

export default function NotificationItem({ notification }) {
  const { date, time, message, seen } = notification;

  return (
    <div
      className={`p-4 rounded-lg border ${
        seen ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">
            {format(new Date(notification.date), 'yyyy-MM-dd HH:mm:ss')}
          </p>
          <p className="text-lg font-medium text-gray-800">{message}</p>
        </div>
        <div>
          <span
            className={`text-xs font-semibold py-1 px-2 rounded ${
              seen ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
            }`}
          >
            {seen ? "Seen" : "New"}
          </span>
        </div>
      </div>
    </div>
  );
}
