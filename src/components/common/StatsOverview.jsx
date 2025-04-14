import { Users, UserPlus, UserCheck, UserMinus } from "lucide-react";
import StatCard from "./StatCard";

const StatsOverview = ({ users }) => {
	const totalUsers = users.length;
	const activeUsers = users.filter((u) => u.status === "Active").length;
	const churnRate = ((totalUsers - activeUsers) / totalUsers) * 100;
	const newUsersToday = 243; // This can be dynamic if you have timestamps

	const stats = [
		{
			name: "Total Users",
			icon: Users,
			value: totalUsers.toLocaleString(),
			color: "#8b5cf6",
		},
		{
			name: "New Users Today",
			icon: UserPlus,
			value: newUsersToday,
			color: "#10b981",
		},
		{
			name: "Active Users",
			icon: UserCheck,
			value: activeUsers.toLocaleString(),
			color: "#f59e0b",
		},
		{
			name: "Churn Rate",
			icon: UserMinus,
			value: `${churnRate.toFixed(1)}%`,
			color: "#ef4444",
		},
	];

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
			{stats.map((stat, index) => (
				<StatCard
					key={index}
					name={stat.name}
					icon={stat.icon}
					value={stat.value}
					color={stat.color}
				/>
			))}
		</div>
	);
};

export default StatsOverview;
