import React, { useState } from "react";
import { Bell, Eye } from "lucide-react";

const mockNotifications = [
  {
    id: "1",
    message: 'New pharmacy "HealthPlus Pharmacy" has registered.',
    type: "pharmacy_registration",
    read: false,
    createdAt: "2025-06-01T15:47:57.470Z",
  },
  {
    id: "2",
    message: 'Pharmacy "Zahid Medicos" approved successfully.',
    type: "pharmacy_approved",
    read: true,
    createdAt: "2025-05-29T10:00:00Z",
  },
  {
    id: "3",
    message: 'License verification failed for "Pharma World".',
    type: "license_failed",
    read: true,
    createdAt: "2025-05-28T08:15:00Z",
  },
  {
    id: "4",
    message: "3 pharmacies are pending review.",
    type: "pending_pharmacy_alert",
    read: false,
    createdAt: "2025-06-02T09:00:00Z",
  },
  {
    id: "5",
    message: "Pharmacy documents updated.",
    type: "pharmacy_update",
    read: true,
    createdAt: "2025-06-02T12:30:00Z",
  },
  {
    id: "6",
    message: "New license submitted for review.",
    type: "license_submission",
    read: false,
    createdAt: "2025-06-03T14:45:00Z",
  },
];

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "new") return !n.read;
    if (filter === "old") return n.read;
    return true;
  });

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredNotifications.slice(startIdx, startIdx + itemsPerPage);

  const markAsRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    const selected = updated.find((n) => n.id === id);
    setSelectedNotification(selected);
  };

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
              setSelectedNotification(null);
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
                <td className="p-4 text-[#211221]">{notif.type.replace(/_/g, " ")}</td>
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
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="bg-[#ffa04c] text-white px-3 py-1 rounded-md flex items-center gap-1 text-sm"
                  >
                    <Eye size={14} />
                    View
                  </button>
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

      {/* Selected Notification */}
      {selectedNotification && (
        <div className="mt-10 bg-white border border-[#ffa04c] rounded-lg shadow-md p-6 w-full">
          <h2 className="text-xl font-bold text-[#00474A] mb-4 flex items-center gap-2">
            <Eye size={20} />
            Notification Details
          </h2>
          <div className="space-y-3 text-[#211221] text-sm">
            <div>
              <span className="font-semibold">Type:</span> {selectedNotification.type.replace(/_/g, " ")}
            </div>
            <div>
              <span className="font-semibold">Message:</span> {selectedNotification.message}
            </div>
            <div>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(selectedNotification.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;
