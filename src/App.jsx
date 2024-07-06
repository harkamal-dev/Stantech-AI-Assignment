import React from "react";
import { AddTransaction } from "./components/AddTransaction";
import { TransactionList } from "./components/TransactionList";
import { Summary } from "./components/Summary";
import { CategoryBreakdown } from "./components/CategoryBreakdown";
import { TransactionProvider } from "./context/TransactionContext";
import "./App.css"

function App() {
	return (
		<TransactionProvider>
			<div className="app">
				<h2>Personal Finance Tracker 💰</h2>
				<div className="wrapper">
					<AddTransaction />
					<div className="summary_list">
						<Summary />
						<TransactionList />
					</div>
				</div>
				<CategoryBreakdown />
			</div>
		</TransactionProvider>
	);
}

export default App;
