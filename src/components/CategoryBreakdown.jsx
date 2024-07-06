import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useTransactions } from "../context/TransactionContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const CategoryBreakdown = () => {
	const { transactions, categories } = useTransactions();

	const { categoryLabels, categoryData } = useMemo(() => {
		const expenses = transactions.filter((transaction) => transaction.type === "expense");
		const categoryAmounts = categories.reduce((acc, category) => {
			acc[category.name] = 0;
			return acc;
		}, {});

		expenses.forEach((expense) => {
			if (categoryAmounts[expense.category] !== undefined) {
				categoryAmounts[expense.category] += expense.amount;
			}
		});

		return {
			categoryLabels: Object.keys(categoryAmounts),
			categoryData: Object.values(categoryAmounts),
		};
	}, [transactions, categories]);

	const data = {
		labels: categoryLabels,
		datasets: [
			{
				label: "Expenses by Category",
				data: categoryData,
				backgroundColor: categoryLabels.map(
					(_, index) => `rgba(${75 + index * 20}, ${192 - index * 15}, ${192 - index * 10}, 0.6)`
				),
				borderColor: categoryLabels.map((_, index) => `rgba(${75 + index * 20}, ${192 - index * 15}, ${192 - index * 10}, 1)`),
				borderWidth: 1,
			},
		],
	};

	const options = {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	return (
		<div>
			<h2>Category Breakdown</h2>
			{categoryData.length > 0 ? <Bar data={data} options={options} /> : <p>No expenses to display</p>}
		</div>
	);
};
