import React, { createContext, useState, useContext, useEffect } from "react";

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
	const [transactions, setTransactions] = useState([]);
	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchTransactions();
		fetchCategories();
	}, []);

	const fetchTransactions = async () => {
		try {
			const response = await fetch("http://localhost:3030/transactions");
			if (!response.ok) {
				throw new Error("Failed to fetch transactions");
			}
			const data = await response.json();
			setTransactions(data);
			setIsLoading(false);
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
		}
	};

	const fetchCategories = async () => {
		try {
			const response = await fetch("http://localhost:3030/categories");
			if (!response.ok) {
				throw new Error("Failed to fetch categories");
			}
			const data = await response.json();
			setCategories(data);
		} catch (err) {
			setError(err.message);
		}
	};

	const addTransaction = async (newTransaction) => {
		try {
			const response = await fetch("http://localhost:3030/transactions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newTransaction),
			});

			if (!response.ok) {
				throw new Error("Failed to add transaction");
			}

			const addedTransaction = await response.json();
			setTransactions([...transactions, addedTransaction]);
			return addedTransaction;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	const value = {
		transactions,
		categories,
		isLoading,
		error,
		addTransaction,
	};

	return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
};
