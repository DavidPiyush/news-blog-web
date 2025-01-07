import NotificationItem from "./NotificationItem";

export default function NotificationList({ notifications = [] }) {
  console.log(notifications);
  return (
    <div className="space-y-4">
      {notifications?.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
