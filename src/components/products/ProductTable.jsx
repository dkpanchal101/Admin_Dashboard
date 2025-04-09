import { motion } from "framer-motion";
import { Edit, Search, Trash2, Plus } from "lucide-react";
import { useState } from "react";

const initialProducts = [
	{ id: 1, name: "Wireless Earbuds", category: "Electronics", price: 59.99, stock: 143, sales: 1200 },
	{ id: 2, name: "Leather Wallet", category: "Accessories", price: 39.99, stock: 89, sales: 800 },
	{ id: 3, name: "Smart Watch", category: "Electronics", price: 199.99, stock: 56, sales: 650 },
	{ id: 4, name: "Yoga Mat", category: "Fitness", price: 29.99, stock: 210, sales: 950 },
	{ id: 5, name: "Coffee Maker", category: "Home", price: 79.99, stock: 78, sales: 720 },
];

const ProductsTable = () => {
	const [products, setProducts] = useState(initialProducts);
	const [searchTerm, setSearchTerm] = useState("");
	const [editingProduct, setEditingProduct] = useState(null);
	const [newProduct, setNewProduct] = useState({ name: "", category: "", price: "", stock: "", sales: "" });

	const handleSearch = (e) => {
		setSearchTerm(e.target.value.toLowerCase());
	};

	const handleDelete = (id) => {
		setProducts(products.filter((product) => product.id !== id));
	};

	const handleEditChange = (e) => {
		setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
	};

	const saveEdit = () => {
		setProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)));
		setEditingProduct(null);
	};

	const handleAdd = () => {
		if (!newProduct.name || !newProduct.category || !newProduct.price) return;
		const newEntry = {
			...newProduct,
			id: Date.now(),
			price: parseFloat(newProduct.price),
			stock: parseInt(newProduct.stock),
			sales: parseInt(newProduct.sales),
		};
		setProducts([...products, newEntry]);
		setNewProduct({ name: "", category: "", price: "", stock: "", sales: "" });
	};

	const filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(searchTerm) ||
			product.category.toLowerCase().includes(searchTerm)
	);

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Product List</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search products...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						onChange={handleSearch}
						value={searchTerm}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			{/* Add New Product Form */}
			<div className='mb-6 flex flex-wrap gap-4'>
				<input type="text" name="name" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="px-3 py-1 rounded bg-gray-700 text-white" />
				<input type="text" name="category" placeholder="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="px-3 py-1 rounded bg-gray-700 text-white" />
				<input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="px-3 py-1 rounded bg-gray-700 text-white" />
				<input type="number" name="stock" placeholder="Stock" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} className="px-3 py-1 rounded bg-gray-700 text-white" />
				<input type="number" name="sales" placeholder="Sales" value={newProduct.sales} onChange={(e) => setNewProduct({ ...newProduct, sales: e.target.value })} className="px-3 py-1 rounded bg-gray-700 text-white" />
				<button onClick={handleAdd} className="text-white bg-green-600 px-3 py-1 rounded flex items-center gap-1"><Plus size={16}/>Add</button>
			</div>

			{/* Product Table */}
			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							{["Name", "Category", "Price", "Stock", "Sales", "Actions"].map((title) => (
								<th key={title} className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
									{title}
								</th>
							))}
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-700'>
						{filteredProducts.map((product) => (
							<motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
								{editingProduct?.id === product.id ? (
									<>
										<td className='px-6 py-2'><input name="name" value={editingProduct.name} onChange={handleEditChange} className="bg-gray-700 text-white px-2 py-1 rounded w-full"/></td>
										<td className='px-6 py-2'><input name="category" value={editingProduct.category} onChange={handleEditChange} className="bg-gray-700 text-white px-2 py-1 rounded w-full"/></td>
										<td className='px-6 py-2'><input name="price" value={editingProduct.price} onChange={handleEditChange} type="number" className="bg-gray-700 text-white px-2 py-1 rounded w-full"/></td>
										<td className='px-6 py-2'><input name="stock" value={editingProduct.stock} onChange={handleEditChange} type="number" className="bg-gray-700 text-white px-2 py-1 rounded w-full"/></td>
										<td className='px-6 py-2'><input name="sales" value={editingProduct.sales} onChange={handleEditChange} type="number" className="bg-gray-700 text-white px-2 py-1 rounded w-full"/></td>
										<td className='px-6 py-2 space-x-2'>
											<button onClick={saveEdit} className="text-green-400 hover:text-green-300">Save</button>
											<button onClick={() => setEditingProduct(null)} className="text-gray-400 hover:text-gray-300">Cancel</button>
										</td>
									</>
								) : (
									<>
										<td className='px-6 py-4 text-sm font-medium text-gray-100'>{product.name}</td>
										<td className='px-6 py-4 text-sm text-gray-300'>{product.category}</td>
										<td className='px-6 py-4 text-sm text-gray-300'>${product.price.toFixed(2)}</td>
										<td className='px-6 py-4 text-sm text-gray-300'>{product.stock}</td>
										<td className='px-6 py-4 text-sm text-gray-300'>{product.sales}</td>
										<td className='px-6 py-4 text-sm text-gray-300 space-x-2'>
											<button onClick={() => setEditingProduct(product)} className='text-indigo-400 hover:text-indigo-300'><Edit size={18} /></button>
											<button onClick={() => handleDelete(product.id)} className='text-red-400 hover:text-red-300'><Trash2 size={18} /></button>
										</td>
									</>
								)}
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};

export default ProductsTable;
