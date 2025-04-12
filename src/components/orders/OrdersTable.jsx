import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Pencil, Trash2, Plus } from "lucide-react";

const initialData = [
  { id: "ORD001", customer: "John Doe", total: 235.4, status: "Delivered", date: "2023-07-01" },
  { id: "ORD002", customer: "Jane Smith", total: 412.0, status: "Processing", date: "2023-07-02" },
  { id: "ORD003", customer: "Bob Johnson", total: 162.5, status: "Shipped", date: "2023-07-03" },
  { id: "ORD004", customer: "Alice Brown", total: 750.2, status: "Pending", date: "2023-07-04" },
  { id: "ORD005", customer: "Charlie Wilson", total: 95.8, status: "Delivered", date: "2023-07-05" },
];

const OrdersTable = () => {
  const [orders, setOrders] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingOrder, setEditingOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (editingOrder.id && orders.find((o) => o.id === editingOrder.id)) {
      // Edit
      setOrders((prev) =>
        prev.map((o) => (o.id === editingOrder.id ? editingOrder : o))
      );
    } else {
      // Add new
      setOrders((prev) => [...prev, { ...editingOrder, id: `ORD${String(prev.length + 1).padStart(3, "0")}` }]);
    }
    setShowModal(false);
    setEditingOrder(null);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this order?")) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
    }
  };

  return (
    <>
      <motion.div
        className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold text-gray-100'>Order List</h2>
          <div className='flex items-center gap-2'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search orders...'
                className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
            </div>
            <button
              onClick={() => {
                setEditingOrder({ id: "", customer: "", total: "", status: "Pending", date: "" });
                setShowModal(true);
              }}
              className='bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center gap-1'
            >
              <Plus size={18} /> Add Order
            </button>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-700'>
            <thead>
              <tr>
                {["Order ID", "Customer", "Total", "Status", "Date", "Actions"].map((col) => (
                  <th
                    key={col}
                    className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-700'>
              {filteredOrders.map((order) => (
                <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>{order.id}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100'>{order.customer}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-100'>${order.total.toFixed(2)}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{order.date}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex gap-2'>
                    <button
                      onClick={() => {
                        setEditingOrder(order);
                        setShowModal(true);
                      }}
                      className='text-yellow-400 hover:text-yellow-300'
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className='text-red-500 hover:text-red-400'
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-gray-900 p-6 rounded-lg w-[90%] max-w-md shadow-lg border border-gray-700'>
            <h3 className='text-lg text-white mb-4'>
              {editingOrder.id ? "Edit Order" : "Add New Order"}
            </h3>
            <div className='space-y-4'>
              <input
                className='w-full px-4 py-2 rounded bg-gray-800 text-white'
                placeholder='Customer Name'
                value={editingOrder.customer}
                onChange={(e) =>
                  setEditingOrder((prev) => ({ ...prev, customer: e.target.value }))
                }
              />
              <input
                className='w-full px-4 py-2 rounded bg-gray-800 text-white'
                placeholder='Total'
                type='number'
                value={editingOrder.total}
                onChange={(e) =>
                  setEditingOrder((prev) => ({ ...prev, total: parseFloat(e.target.value) || 0 }))
                }
              />
              <select
                className='w-full px-4 py-2 rounded bg-gray-800 text-white'
                value={editingOrder.status}
                onChange={(e) =>
                  setEditingOrder((prev) => ({ ...prev, status: e.target.value }))
                }
              >
                <option>Delivered</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Pending</option>
              </select>
              <input
                className='w-full px-4 py-2 rounded bg-gray-800 text-white'
                type='date'
                value={editingOrder.date}
                onChange={(e) =>
                  setEditingOrder((prev) => ({ ...prev, date: e.target.value }))
                }
              />
            </div>
            <div className='flex justify-end gap-4 mt-6'>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingOrder(null);
                }}
                className='bg-gray-600 px-4 py-2 rounded text-white'
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className='bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white'
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersTable;
