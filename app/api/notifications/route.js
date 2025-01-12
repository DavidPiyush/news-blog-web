import { connectToDB } from "@/app/_lib/connectDB";
import Notification from "@/models/NotificationModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch notifications from the database
    const notifications = await Notification.find();

    // Return the notifications as a response
    return NextResponse.json(
      { message: "Notifications fetched successfully!", notifications },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while retrieving Notifications" },
      { status: 500 }
    );
  }
}
