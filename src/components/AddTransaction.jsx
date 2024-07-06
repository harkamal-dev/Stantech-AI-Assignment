import React, { useState } from "react";
import styled from "styled-components";
import { useTransactions } from "../context/TransactionContext";

const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	max-width: 300px;
	margin: 20px auto;
	padding: 20px;
	background-color: #f5f5f5;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	width: 20%;

	@media (max-width: 768px) {
		width: 80%;
	}
`;

const Input = styled.input`
	margin-bottom: 10px;
	padding: 8px;
	border: 1px solid #ddd;
	border-radius: 4px;
`;

const Select = styled.select`
	margin-bottom: 10px;
	padding: 8px;
	border: 1px solid #ddd;
	border-radius: 4px;
`;

const Button = styled.button`
	padding: 10px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
    font-size: 1rem;
	&:hover {
		background-color: #0056b3;
	}
`;

export const AddTransaction = () => {
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState("");
	const [type, setType] = useState("expense");
	const [category, setCategory] = useState("");

	const { categories, addTransaction } = useTransactions();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newTransaction = {
			description,
			amount: Number(amount),
			type,
			category,
			date: new Date().toISOString(),
		};

		try {
			await addTransaction(newTransaction);
			setDescription("");
			setAmount("");
			setType("expense");
			setCategory("");
		} catch (error) {
			console.error("Error adding transaction:", error);
		}
	};

	return (
		<FormContainer onSubmit={handleSubmit}>
			<Input
				type="text"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				placeholder="Description"
				required
			/>
			<Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
			<Select value={type} onChange={(e) => setType(e.target.value)}>
				<option value="expense">Expense</option>
				<option value="income">Income</option>
			</Select>
			<Select value={category} onChange={(e) => setCategory(e.target.value)} required>
				<option value="">Select a category</option>
				{categories.map((cat) => (
					<option key={cat.id} value={cat.name}>
						{cat.name}
					</option>
				))}
			</Select>
			<Button type="submit">Add Transaction</Button>
		</FormContainer>
	);
};
