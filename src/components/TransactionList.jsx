import React from "react";
import styled from "styled-components";
import { useTransactions } from "../context/TransactionContext";

const TransactionListContainer = styled.div`
	max-width: 600px;
	margin: 0 auto;
	padding: 20px;
	width: 80%;
`;

const Title = styled.h2`
	color: #333;
	text-align: center;
`;

const TransactionCard = styled.div`
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	padding: 15px;
	margin-bottom: 15px;
	transition: transform 0.2s ease-in-out;

	&:hover {
		transform: translateY(-3px);
	}
`;

const TransactionDescription = styled.div`
	font-weight: bold;
	color: #333;
`;

const TransactionAmount = styled.span`
	font-weight: bold;
	color: ${(props) => (props.type === "income" ? "#28a745" : "#dc3545")};
`;

const TransactionType = styled.span`
	background-color: ${(props) => (props.type === "income" ? "#28a745" : "#dc3545")};
	color: white;
	padding: 3px 8px;
	border-radius: 12px;
	font-size: 0.8em;
	margin-left: 10px;
`;

const TransactionDetails = styled.div`
	color: #666;
	font-size: 0.9em;
	margin-top: 5px;
`;

export const TransactionList = () => {
	const { transactions, isLoading, error } = useTransactions();

	if (isLoading) return <div>Loading transactions...</div>;
    if (error) return <div>Error: {error}</div>;
    
	return (
		<TransactionListContainer>
			<Title>Transactions 💵</Title>
			{[...transactions]
				.sort((a, b) => {
					return new Date(b.date) - new Date(a.date);
				})
				.map((transaction) => (
					<TransactionCard key={transaction.id}>
						<TransactionDescription>
							{transaction.description}
							<TransactionType type={transaction.type}>{transaction.type}</TransactionType>
						</TransactionDescription>
						<TransactionAmount type={transaction.type}>${transaction.amount}</TransactionAmount>
						<TransactionDetails>
							Category: {transaction.category} | Date: {new Date(transaction.date).toISOString().split("T")[0]}
						</TransactionDetails>
					</TransactionCard>
				))}
		</TransactionListContainer>
	);
};
