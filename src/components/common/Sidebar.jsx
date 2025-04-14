import {
	BarChart2,
	DollarSign,
	LogIn,
	Menu,
	ShoppingBag,
	ShoppingCart,
	TrendingUp,
	Users,
	CalendarIcon,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
	{ name: "Overview", icon: BarChart2, color: "#6366f1", href: "/" },
	{ name: "Products", icon: ShoppingBag, color: "#8B5CF6", href: "/products" },
	{ name: "Calendar", icon: CalendarIcon, color: "#F472B6", href: "/calendar" },
	{ name: "Users", icon: Users, color: "#EC4899", href: "/users" },
	{ name: "Sales", icon: DollarSign, color: "#10B981", href: "/sales" },
	{ name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },
	{ name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
	{ name: "Login", icon: LogIn, color: "#8B5CF6", href: "/Login" },
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	return (
		<motion.div
			animate={{ width: isSidebarOpen ? 256 : 80 }}
			transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
			className="relative z-10 h-screen flex-shrink-0 bg-gray-800 bg-opacity-50 backdrop-blur-md border-r border-gray-700"
		>
			<div className="h-full p-4 flex flex-col">
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen((prev) => !prev)}
					className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
				>
					<Menu size={24} />
				</motion.button>

				<nav className="mt-8 flex-grow">
					{SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={item.href}>
							<motion.div
								layout
								className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 overflow-hidden"
							>
								<item.icon
									size={20}
									style={{ color: item.color, minWidth: "20px" }}
									className="transition-transform duration-300 group-hover:scale-110"
								/>
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className="ml-4 whitespace-nowrap"
											initial={{ opacity: 0, x: -10 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -10 }}
											transition={{ duration: 0.2 }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>
			</div>
		</motion.div>
	);
};

export default Sidebar;
