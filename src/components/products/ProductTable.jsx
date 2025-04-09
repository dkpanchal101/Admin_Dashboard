import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProductTable = ({ products, setProducts }) => {
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [price, setPrice] = useState("");
	const [stock, setStock] = useState("");
	const [sales, setSales] = useState("");
	const [editId, setEditId] = useState(null);
	const [showForm, setShowForm] = useState(false);

	const clearForm = () => {
		setName("");
		setCategory("");
		setPrice("");
		setStock("");
		setSales("");
		setEditId(null);
		setShowForm(false);
	};

	const handleAdd = () => {
		if (!showForm) {
			setShowForm(true);
			return;
		}

		if (!name || !category || !price || !stock || !sales) return;

		if (editId !== null) {
			setProducts((prev) =>
				prev.map((p) =>
					p.id === editId
						? {
							...p,
							name,
							category,
							price: parseFloat(price),
							stock: parseInt(stock),
							sales: parseInt(sales),
						}
						: p
				)
			);
		} else {
			const newProduct = {
				id: Date.now(),
				name,
				category,
				price: parseFloat(price),
				stock: parseInt(stock),
				sales: parseInt(sales),
			};
			setProducts((prev) => [...prev, newProduct]);
		}

		clearForm();
	};

	const handleEdit = (product) => {
		setEditId(product.id);
		setName(product.name);
		setCategory(product.category);
		setPrice(product.price);
		setStock(product.stock);
		setSales(product.sales);
		setShowForm(true);
	};

	const handleDelete = (id) => {
		setProducts((prev) => prev.filter((p) => p.id !== id));
		if (editId === id) clearForm();
	};

	return (
		<div className='bg-[#111827] p-6 rounded-xl shadow-md'>
			<h2 className='text-xl font-semibold mb-4 text-white'>Product List</h2>

			<div className='flex flex-wrap items-start gap-3 mb-6'>
				<AnimatePresence>
					{showForm && (
						<motion.div
							className='flex flex-wrap gap-3'
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.4 }}
						>
							<input
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder='Name'
								className='px-3 py-2 rounded bg-[#1f2937] text-white'
							/>
							<input
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								placeholder='Category'
								className='px-3 py-2 rounded bg-[#1f2937] text-white'
							/>
							<input
								value={price}
								onChange={(e) => setPrice(e.target.value)}
								type='number'
								placeholder='Price'
								className='px-3 py-2 rounded bg-[#1f2937] text-white'
							/>
							<input
								value={stock}
								onChange={(e) => setStock(e.target.value)}
								type='number'
								placeholder='Stock'
								className='px-3 py-2 rounded bg-[#1f2937] text-white'
							/>
							<input
								value={sales}
								onChange={(e) => setSales(e.target.value)}
								type='number'
								placeholder='Sales'
								className='px-3 py-2 rounded bg-[#1f2937] text-white'
							/>
						</motion.div>
					)}
				</AnimatePresence>

				<div className='flex gap-2 mt-2'>
					<button
						onClick={handleAdd}
						className={`${editId !== null ? "bg-yellow-600" : "bg-green-600"
							} px-4 py-2 text-white rounded`}
					>
						{editId !== null ? "Save" : showForm ? "Add Product" : "+ Add"}
					</button>

					{showForm && (
						<button onClick={clearForm} className='bg-gray-600 px-4 py-2 text-white rounded'>
							Cancel
						</button>
					)}
				</div>
			</div>

			<table className='w-full text-sm text-left text-gray-400'>
				<thead className='text-xs uppercase text-gray-500 bg-[#1f2937]'>
					<tr>
						<th className='px-4 py-2'>Name</th>
						<th className='px-4 py-2'>Category</th>
						<th className='px-4 py-2'>Price</th>
						<th className='px-4 py-2'>Stock</th>
						<th className='px-4 py-2'>Sales</th>
						<th className='px-4 py-2'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product.id} className='border-b border-gray-700 hover:bg-[#2a2e3c]'>
							<td className='px-4 py-2'>{product.name}</td>
							<td className='px-4 py-2'>{product.category}</td>
							<td className='px-4 py-2'>${product.price.toFixed(2)}</td>
							<td className='px-4 py-2'>{product.stock}</td>
							<td className='px-4 py-2'>{product.sales}</td>
							<td className='px-4 py-2 flex gap-2'>
								<button className='text-blue-400' onClick={() => handleEdit(product)}>
									<Pencil size={16} />
								</button>
								<button className='text-red-400' onClick={() => handleDelete(product.id)}>
									<Trash size={16} />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProductTable;
