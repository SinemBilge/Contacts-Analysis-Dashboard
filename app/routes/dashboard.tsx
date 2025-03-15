import { useLoaderData } from "react-router";
import { useState, useEffect } from "react";
import { Bar, BarChart, PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import React from "react";
import { FaEnvelope } from "react-icons/fa";

export const clientLoader = async () => {
	return {
		// The total amount of contacts per day for the last 7 days
		contacts: {
			lastWeek: [398, 412, 425, 430, 445, 460, 430],
			thisWeek: [438, 438, 450, 459, 482, 483, 492],
		},
		support: {
			email: "help@keaz.app",
		},
		shopifyRevenue: {
			lastWeek: 15874,
			thisWeek: 20023,
		},
		contactSources: [
			{
				source: "Shopify Order",
				count: 232,
			},
			{
				source: "Shopify Widget",
				count: 35,
			},
			{
				source: "Chat-In",
				count: 125,
			},
			{
				source: "Instagram Bio Link",
				count: 48,
			},
			{
				source: "Manually Created",
				count: 11,
			},
		],
	}
}
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];
const Dashboard = () => {
	const data = useLoaderData<typeof clientLoader>();
	const [glow, setGlow] = useState(false);
	const [hiddenCategories, setHiddenCategories] = useState<string[]>([]);
	const totalLastWeek = data.contacts.lastWeek.reduce((a, b) => a + b, 0);
	const totalThisWeek = data.contacts.thisWeek.reduce((a, b) => a + b, 0);
	const percentageIncrease = ((totalThisWeek - totalLastWeek) / totalLastWeek) * 100;
	const increaseData = [
		{ name: "Last Week", value: totalLastWeek },
		{ name: "This Week", value: totalThisWeek },
	];

	// For Pie Chart visibility for 5 different sections
	const handleLegendClick = (sourceName: string) => {
		setHiddenCategories((prev) =>
			prev.includes(sourceName)
				? prev.filter((s) => s !== sourceName) 
				: [...prev, sourceName]
		);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setGlow((prev) => !prev);
		}, 700);
		return () => clearInterval(interval);
	}, []);

	// Bar Chart Data
	const revenueData = [
		{ name: "Last Week", value: data.shopifyRevenue.lastWeek },
		{ name: "This Week", value: data.shopifyRevenue.thisWeek },
	];

	// Line chart data
	const contactsData = data.contacts.thisWeek.map((value: any, index: number) => ({
		day: `Day ${index + 1}`,
		lastWeek: data.contacts.lastWeek[index],
		thisWeek: value,
	}));

	return (

		<div className="p-3 flex pt-0 flex-col items-center bg-gray-50 min-h-screen">
			<header className="w-full bg-gray-100 py-2 text-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800">📊 Keaz Dashboard</h1>
			</header>
			{/* For Grids Display */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-4xl">
				{/*Bar Chart for showing Revenue*/}
				<div className="p-2 bg-white shadow-lg rounded-lg text-center">
					<h3 className="font-bold text-lg mb-2">Shopify Revenue</h3>
					<ResponsiveContainer width="100%" height={window.innerWidth < 768 ? 180 : 250}>
						<BarChart data={revenueData} layout="vertical" margin={{ left: 5, right: 5 }}>
							<XAxis type="number" />
							<YAxis type="category" dataKey="name" />
							<Tooltip />
							<Bar dataKey="value" barSize={window.innerWidth < 768 ? 30 : 50} radius={[10, 10, 10, 20]}>
								{revenueData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index]} />
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
					<p className={`font-semibold transition-transform duration-500 ${glow ? "scale-100 text-red-500" : "scale-100 text-blue-600"
						} ${window.innerWidth < 768 ? "text-sm" : "text-lg"}`}>
						📈 Increase: {((data.shopifyRevenue.thisWeek - data.shopifyRevenue.lastWeek) / data.shopifyRevenue.lastWeek * 100).toFixed(2)}%
					</p>
				</div>

				{/* Bar Chart for Contact Increase*/}
				<div className="p-2 bg-white shadow-lg rounded-lg text-center">
					<h3 className="font-bold text-lg mb-2">Contact Increase</h3>
					<ResponsiveContainer width="100%" height={window.innerWidth < 768 ? 180 : 250}>
						<BarChart data={increaseData} layout="vertical" margin={{ left: 5, right: 5 }}>
							<XAxis type="number" />
							<YAxis type="category" dataKey="name" />
							<Tooltip />
							<Bar dataKey="value" barSize={window.innerWidth < 768 ? 30 : 50} radius={[10, 10, 10, 20]}>
								{increaseData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index + 3]} />
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
					<p className={`font-semibold transition-transform duration-500 ${glow ? "scale-100 text-red-500" : "scale-100 text-blue-600"
						} ${window.innerWidth < 768 ? "text-sm" : "text-lg"}`}>
						📈 Increase: {percentageIncrease.toFixed(2)}%
					</p>
				</div>
			</div>


			{/* Pie Chart that shows Contact Sources*/}
			<div className="bg-white shadow-lg rounded-lg p-6 mt-10 w-full max-w-4xl">
				<h3 className="font-bold text-lg mb-4 text-center">Contact Sources</h3>
				<ResponsiveContainer width="100%" height={300}>
					<PieChart>
						<Pie
							data={data.contactSources}
							dataKey="count"
							nameKey="source"
							cx="50%"
							cy="50%"
							outerRadius={window.innerWidth < 768 ? 75 : 120}
						>
							{data.contactSources.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
									opacity={hiddenCategories.includes(entry.source) ? 0 : 1}
								/>
							))}
						</Pie>
						<Tooltip />
						<Legend
							onClick={(e) => handleLegendClick(e.value)}
							wrapperStyle={{
								cursor: "pointer",
								display: "flex",
								flexWrap: "wrap",
								justifyContent: "center",
								gap: "10px",
								maxWidth: "100%",
								overflowX: "auto",
							}}
							layout="horizontal"
							align="center"
							formatter={(value) => (
								<span
									style={{
										textDecoration: hiddenCategories.includes(value) ? "line-through" : "none",
										fontWeight: hiddenCategories.includes(value) ? "normal" : "bold",
										cursor: "pointer",
									}}
								>
									{value}
								</span>
							)}
						/>
					</PieChart>
				</ResponsiveContainer>
			</div>


			{/* The trend line chart made with Contacts data */}
			<div className="bg-white shadow rounded-lg p-4 sm:p-6 mt-10 w-full max-w-4xl">
				<h3 className="font-bold text-sm sm:text-lg text-center mb-2 mt-6 sm:mt-12">Contacts Trend</h3>
				<ResponsiveContainer width="100%" height={window.innerWidth < 768 ? 270 : 350}>
					<LineChart data={contactsData} margin={{ right: window.innerWidth < 768 ? 10 : 30 }}>
						<XAxis
							dataKey="day"
							tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }}
							angle={window.innerWidth < 768 ? 0 : 0}
							textAnchor="end"
						/>
						<YAxis tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }} />
						<Tooltip />
						<Legend wrapperStyle={{ fontSize: window.innerWidth < 768 ? "10px" : "16px" }} />
						<Line
							type="monotone"
							dataKey="lastWeek"
							stroke="#FF5733"
							strokeWidth={window.innerWidth < 768 ? 2 : 3}
							dot={{ r: window.innerWidth < 768 ? 3 : 5 }}
						/>
						<Line
							type="monotone"
							dataKey="thisWeek"
							stroke="#3498DB"
							strokeWidth={window.innerWidth < 768 ? 2 : 3}
							dot={{ r: window.innerWidth < 768 ? 3 : 5 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>

			<div className="w-full flex justify-center mb-6">
				<div className="flex items-center gap-3  mt-4">
					<h3 className="font-bold italic text-sm sm:text-lg">
						Do you have any questions? Reach out to us!
        			</h3>
					<a
						href={`mailto:${data.support.email}?subject=Support Inquiry&body=Hello, I need help with...`}
						className="flex items-center gap-2 bg-blue-400 text-white font-semibold font-sans px-4 py-2 rounded-md transition duration-300 hover:bg-blue-300 shadow-md cursor-pointer  "
					>
						<FaEnvelope /> Email
					</a>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;