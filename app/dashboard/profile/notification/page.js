import NotificationList from "@/app/_components/NotificationList";
import { connectToDB } from "@/app/_lib/connectDB";
import { getUser } from "@/app/_lib/data-service";
import Notification from "@/models/NotificationModel";
import { getServerSession } from "next-auth";

export default async function page() {
  // Get the user session
  const session = await getServerSession();

  try {
    // Connect to the database
    await connectToDB();

    // Get the user details
    const { user } = await getUser(session.user.email);

    // Fetch the notifications for the user
    const userNotifications = await Notification.find({ userId: user._id }).sort({
      createdAt: -1,
    });

    // console.log(userNotifications,"this array");
    // Return the notifications page
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Notifications</h1>
          {/* Pass the notifications to the NotificationList component */}
          <NotificationList notifications={userNotifications} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>
            There was an issue fetching your notifications. Please try again
            later.
          </p>
        </div>
      </div>
    );
  }
}
