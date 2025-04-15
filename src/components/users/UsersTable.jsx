import { useState } from "react";
import { motion } from "framer-motion";
import StatsOverview from "../common/StatsOverview";

const initialData = [
	{ id: 1, name: "John Doe", email: "john@example.com", role: "Customer", status: "Active" },
	{ id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin", status: "Active" },
	{ id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Customer", status: "Inactive" },
	{ id: 4, name: "Alice Brown", email: "alice@example.com", role: "Customer", status: "Active" },
	{ id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Moderator", status: "Active" },
];

const UsersTable = () => {
	const [users, setUsers] = useState(initialData);
	const [searchTerm, setSearchTerm] = useState("");
	const [editingUser, setEditingUser] = useState(null);
	const [newUser, setNewUser] = useState({ name: "", email: "", role: "", status: "Active" });

	const handleSearch = (e) => {
		setSearchTerm(e.target.value.toLowerCase());
	};

	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchTerm) ||
			user.email.toLowerCase().includes(searchTerm)
	);

	const handleDelete = (id) => {
		setUsers(users.filter((user) => user.id !== id));
	};

	const handleEditClick = (user) => {
		setEditingUser(user);
	};

	const handleEditChange = (e) => {
		const { name, value } = e.target;
		setEditingUser({ ...editingUser, [name]: value });
	};

	const handleEditSave = () => {
		setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)));
		setEditingUser(null);
	};

	const handleNewUserChange = (e) => {
		const { name, value } = e.target;
		setNewUser({ ...newUser, [name]: value });
	};

	const handleAddUser = () => {
		if (newUser.name && newUser.email && newUser.role) {
			const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
			setUsers([...users, { ...newUser, id }]);
			setNewUser({ name: "", email: "", role: "", status: "Active" });
		}
	};

	return (
		<>
			{/* Stat Cards Section */}
			<StatsOverview users={users} />

			<motion.div
				className='bg-gray-800 bg-opacity-50 mt-0 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>


				{/* Add New User Form */}
				<div className='mb-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
					<input
						type='text'
						name='name'
						placeholder='Name'
						value={newUser.name}
						onChange={handleNewUserChange}
						className='bg-gray-700 text-white px-3 py-2 rounded'
					/>
					<input
						type='email'
						name='email'
						placeholder='Email'
						value={newUser.email}
						onChange={handleNewUserChange}
						className='bg-gray-700 text-white px-3 py-2 rounded'
					/>
					<input
						type='text'
						name='role'
						placeholder='Role'
						value={newUser.role}
						onChange={handleNewUserChange}
						className='bg-gray-700 text-white px-3 py-2 rounded'
					/>
					<button
						onClick={handleAddUser}
						className='bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded'
					>
						Add User
					</button>
				</div>

				{/* Users Table */}
				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-700'>
						<thead>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase'>Name</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase'>Email</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase'>Role</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase'>Status</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase'>Actions</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-700'>
							{filteredUsers.map((user) =>
								editingUser?.id === user.id ? (
									<tr key={user.id}>
										<td className='px-6 py-2'>
											<input
												name='name'
												value={editingUser.name}
												onChange={handleEditChange}
												className='bg-gray-700 text-white px-2 py-1 rounded'
											/>
										</td>
										<td className='px-6 py-2'>
											<input
												name='email'
												value={editingUser.email}
												onChange={handleEditChange}
												className='bg-gray-700 text-white px-2 py-1 rounded'
											/>
										</td>
										<td className='px-6 py-2'>
											<input
												name='role'
												value={editingUser.role}
												onChange={handleEditChange}
												className='bg-gray-700 text-white px-2 py-1 rounded'
											/>
										</td>
										<td className='px-6 py-2'>
											<select
												name='status'
												value={editingUser.status}
												onChange={handleEditChange}
												className='bg-gray-700 text-white px-2 py-1 rounded'
											>
												<option value='Active'>Active</option>
												<option value='Inactive'>Inactive</option>
											</select>
										</td>
										<td className='px-6 py-2'>
											<button onClick={handleEditSave} className='text-green-400 mr-2'>Save</button>
											<button onClick={() => setEditingUser(null)} className='text-red-400'>Cancel</button>
										</td>
									</tr>
								) : (
									<motion.tr
										key={user.id}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.3 }}
									>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='flex items-center'>
												<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
													{user.name.charAt(0)}
												</div>
												<div className='ml-4 text-sm font-medium text-gray-100'>{user.name}</div>
											</div>
										</td>
										<td className='px-6 py-4 text-sm text-gray-300'>{user.email}</td>
										<td className='px-6 py-4'>
											<span className='px-2 inline-flex text-xs font-semibold rounded-full bg-blue-800 text-blue-100'>
												{user.role}
											</span>
										</td>
										<td className='px-6 py-4'>
											<span
												className={`px-2 inline-flex text-xs font-semibold rounded-full ${user.status === "Active"
														? "bg-green-800 text-green-100"
														: "bg-red-800 text-red-100"
													}`}
											>
												{user.status}
											</span>
										</td>
										<td className='px-6 py-4 text-sm text-gray-300'>
											<button onClick={() => handleEditClick(user)} className='text-indigo-400 hover:text-indigo-300 mr-2'>
												Edit
											</button>
											<button onClick={() => handleDelete(user.id)} className='text-red-400 hover:text-red-300'>
												Delete
											</button>
										</td>
									</motion.tr>
								)
							)}
						</tbody>
					</table>
				</div>
			</motion.div>
		</>
	);
};

export default UsersTable;
