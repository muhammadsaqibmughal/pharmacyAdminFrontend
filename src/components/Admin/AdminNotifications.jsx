import React, { useState, useEffect } from "react";
import { Bell, Eye } from "lucide-react";
import { getNotifications, readNotification } from "../../api/admin"; 

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);  
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);  
  const itemsPerPage = 5;

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await getNotifications(); 
      if (response.status === "success") {
        setNotifications(response.data);
      } else {
        setError("Failed to fetch notifications.");
      }
    } catch (err) {
      setError("An error occurred while fetching notifications.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "new") return !n.read;
    if (filter === "old") return n.read;
    return true;
  });

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredNotifications.slice(startIdx, startIdx + itemsPerPage);

  // Mark as read (call API + refetch notifications)
  const markAsRead = async (id) => {
    try {
      await readNotification(id); // call backend
      await fetchNotifications(); // refresh list after backend update
    } catch (err) {
      console.log("Error marking as read:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-primary">
        Loading notifications...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-error">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 bg-[#F5F5F5] min-h-screen">
      <h1 className="text-3xl font-bold text-[#00474A] mb-6 flex items-center gap-2">
        <Bell size={24} />
        Notifications
      </h1>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        {["all", "new", "old"].map((key) => (
          <button
            key={key}
            onClick={() => {
              setFilter(key);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full border-2 ${
              filter === key
                ? "bg-[#ffa04c] text-white border-[#ffa04c]"
                : "bg-white text-[#211221] border-[#ffa04c]"
            } text-sm font-semibold`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto rounded-xl border border-[#ddd]">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#211221] text-white">
            <tr>
              <th className="p-4 text-sm font-semibold">Type</th>
              <th className="p-4 text-sm font-semibold">Message</th>
              <th className="p-4 text-sm font-semibold">Date</th>
              <th className="p-4 text-sm font-semibold">Status</th>
              <th className="p-4 text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((notif) => (
              <tr key={notif.id} className="bg-white border-t border-[#eee]">
                <td className="p-4 text-[#211221]">
                  {notif.type.replace(/_/g, " ")}
                </td>
                <td className="p-4 text-[#757575] text-sm">{notif.message}</td>
                <td className="p-4 text-[#757575] text-sm">
                  {new Date(notif.createdAt).toLocaleString()}
                </td>
                <td className="p-4">
                  <span
                    className={`font-semibold ${
                      notif.read ? "text-[#4CAF50]" : "text-[#D32F2F]"
                    }`}
                  >
                    {notif.read ? "Read" : "Unread"}
                  </span>
                </td>
                <td className="p-4">
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="bg-[#ffa04c] text-white px-3 py-1 rounded-md flex items-center gap-1 text-sm"
                    >
                      <Eye size={14} />
                      Mark Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-[#757575] py-4">
                  No notifications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-1 text-sm rounded border border-[#ffa04c] text-[#ffa04c] hover:bg-[#ffa04c] hover:text-white transition disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="text-[#211221] font-medium text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-1 text-sm rounded border border-[#ffa04c] text-[#ffa04c] hover:bg-[#ffa04c] hover:text-white transition disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;
