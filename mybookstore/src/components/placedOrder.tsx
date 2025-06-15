import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../slices/productsAPISlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
export default function PlacedOrders() {
  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  };

  const thStyle = {
    backgroundColor: "#f4f4f4",
    padding: "12px",
    fontSize: "16px",
    borderBottom: "2px solid #ddd",
  };

  const rowStyle = {
    transition: "background 0.3s ease",
  };

  const tdStyle = {
    padding: "12px",
    fontSize: "16px",
    borderBottom: "1px solid #ddd",
  };
  const { userInfo } = useSelector((state: any) => state.auth);
  const { data, refetch } = useGetProductsQuery({
    userId: !Boolean(userInfo.isAdmin) ? userInfo._id : "",
  });

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const orders = data?.products;

  const getStatusColor = (status: any) => {
    const statusColors: any = {
      Pending: "#FACC15",
      "In Review": "#3B82F6",
      "In Discussion": "#10B981",
      Completed: "#8B5CF6",
      "Out for Delivery": "#F97316",
      Delivered: "#22C55E",
      Cancelled: "#E11D48",
      Rejected: "#991B1B",
    };
    return statusColors[status] || "#6B7280";
  };

  const status = [
    "Pending",
    "In Review",
    "In Discussion",
    "In Progress",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
    "Rejected",
  ];

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleStatusChange = async (orderId: any, newStatus: any) => {
    /**
   * Handle updating the status of an order
   * @param {string} orderId The id of the order
   * @param {string} newStatus The new status of the order
/*************  ✨ Windsurf Command ⭐  *************/
    /*******  7e67a70f-db91-46f1-a918-719a14d74beb  *******/
    try {
      const payload = {
        _id: orderId,
        status: newStatus,
      };
      const result: any = await updateProduct(payload);
      if (result.error) {
        toast.error(result.error.data.message);
      } else {
        refetch();
        toast.success("Order status updated successfully");
      }
    } catch (error) {
      console.error("Failed to update order status", error);
    }
  };

  const handleDelete = async (orderId: any) => {
    try {
      const result = await deleteProduct(orderId);
      if (result) {
        toast.success("Order deleted successfully");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete order");
      console.error("Failed to delete order", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        textAlign: "center" as const,
      }}
    >
      <h2 style={titleStyle}>📋 Your Orders</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse" as const,
        }}
      >
        <thead>
          <tr style={rowStyle}>
            {userInfo?.isAdmin && <th style={thStyle}>User Name</th>}
            <th style={thStyle}>Order Name</th>
            <th style={thStyle}>Status</th>
            {!userInfo?.isAdmin && <th style={thStyle}>Action</th>}
            {userInfo?.isAdmin && <th style={thStyle}>Phone Number</th>}
            {userInfo?.isAdmin && <th style={thStyle}>Action</th>}
          </tr>
        </thead>
        <tbody>
          {orders?.map((order: any) => (
            <motion.tr
              key={order._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={rowStyle}
            >
              {userInfo.isAdmin && <td style={tdStyle}>{order.name}</td>}
              <td style={tdStyle}>{order.projectTitle}</td>
              <td style={{ ...tdStyle, color: getStatusColor(order.status) }}>
                {order.status}
              </td>
              {userInfo.isAdmin && (
                <td style={tdStyle}>{order?.phoneNumber}</td>
              )}
              {!userInfo?.isAdmin && order.status === "Pending" && (
                <th style={thStyle}>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(order._id)}
                  >
                    Cancel Order
                  </Button>
                </th>
              )}

              {userInfo.isAdmin && (
                <td style={tdStyle}>
                  <select
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    {status.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              )}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
