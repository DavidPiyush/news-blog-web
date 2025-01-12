'use client'
import { format } from "date-fns";
import { deleteNotification } from "../_lib/actions";
import toast from "react-hot-toast";

export default function NotificationItem({ notification }) {
  const { date, time, message, seen, _id } = notification;

  return (
    <div
      className={`p-4 rounded-lg border ${
        seen ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">
            {format(new Date(date), "yyyy-MM-dd HH:mm:ss")}
          </p>
          <p className="text-lg font-medium text-gray-800">{message}</p>
        </div>
        <div className="flex items-center ">
          <div>
            <span
              className={`text-xs font-semibold py-1 px-2 rounded ${
                seen ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
              }`}
            >
              {seen ? "Seen" : "New"}
            </span>
          </div>
          <form action={async (formData)=>{
           const res =  await deleteNotification(formData)
           if(res || res.success){
            toast.success("Notification is deleted sucessfully!")
           }else{
            toast.error("Failed to delete notification")
           }
          }}>
            <input className="hidden" defaultValue={_id.toString()} name="id" />
            <button className="text-sm text-red-600 hover:text-red-800 ml-2">
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
