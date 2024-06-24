import React from "react";
import { getAllMatchingItems } from "../Helpers";
import { useLoaderData } from "react-router-dom";
import BudgetItem from "./BudgetItem";
import AddExpenseForm from "./AddExpenseForm";
import Table from "./Table";

//loader
export async function budgetLoader({ params }) {
	const budget = await getAllMatchingItems({
		catagory: "budgets",
		key: "id",
		value: params.id,
	})[0];

	const expenses = await getAllMatchingItems({
		catagory: "expenses",
		key: "budgetId",
		value: params.id,
	});

	if (!budget) {
		throw new Error("The budget you are trying to find does't exist");
	}

	return { budget, expenses };
}

const BudgetPage = () => {
	const { budget, expenses } = useLoaderData();
	return (
		<div className="grid-lg" style={{ "--accent": budget.color }}>
			<h1 className="h2">
				<span className="accent">{budget.name}</span>
				Overview
			</h1>
			<div className="flex-lg">
				<BudgetItem budget={budget} showDelete={true} />
				<AddExpenseForm budgets={[budget]} />
			</div>
			{expenses && expenses.length > 0 && (
				<div className="grid-md">
					<h2>
						<span className="accent">{budget.name}</span>
						Expenses
					</h2>
					<Table expenses={expenses} showBudget={false}></Table>
				</div>
			)}
		</div>
	);
};

export default BudgetPage;
