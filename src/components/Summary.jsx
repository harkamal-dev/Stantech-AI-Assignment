import React from "react";
import styled from "styled-components";
import { useTransactions } from "../context/TransactionContext";

const SummaryContainer = styled.div`
	background-color: #f8f9fa;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	padding: 20px;
	max-width: 400px;
	margin: 20px auto;
`;

const Title = styled.h2`
	color: #333;
	text-align: center;
	margin-bottom: 20px;
`;

const SummaryItem = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
	padding: 10px;
	background-color: white;
	border-radius: 4px;
`;

const Label = styled.span`
	font-weight: bold;
	color: #555;
`;

const Amount = styled.span`
	font-weight: bold;
	color: ${(props) => (props.type === "income" ? "#28a745" : props.type === "expense" ? "#dc3545" : "#007bff")};
`;

export const Summary = () => {
	const { transactions } = useTransactions();

	const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);

	const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);

	const balance = totalIncome - totalExpenses;

	return (
		<SummaryContainer>
			<Title>Summary</Title>
			<SummaryItem>
				<Label>Total Income:</Label>
				<Amount type="income">${totalIncome.toFixed(2)}</Amount>
			</SummaryItem>
			<SummaryItem>
				<Label>Total Expenses:</Label>
				<Amount type="expense">${totalExpenses.toFixed(2)}</Amount>
			</SummaryItem>
			<SummaryItem>
				<Label>Balance:</Label>
				<Amount type="balance">${balance.toFixed(2)}</Amount>
			</SummaryItem>
		</SummaryContainer>
	);
};
