import React from "react";
import { createExpense, deletedItem, getAllMatchingItems } from "../Helpers";
import { useLoaderData } from "react-router-dom";
import BudgetItem from "./BudgetItem";
import AddExpenseForm from "./AddExpenseForm";
import Table from "./Table";
import { toast } from "react-toastify";

// loader
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


export async function budgetAction({ request }) {
	const data = await request.formData();
	const { _action, ...values } = Object.fromEntries(data);

	if (_action === "createExpense") {
		try {
			createExpense({
				name: values.newExpense,
				amount: values.newExpenseAmount,
				budgetId: values.newExpenseBudget,
			});
			return toast.success(`Expense ${values.newExpense} created!`);
		} catch (e) {
			throw new Error("There was a problem creating your expense.");
		}
	}
	
	//delete
	if (_action === "deleteExpense") {
		try {
			deletedItem({
				key: "expenses",
				id: values.expenseId,
			});
			return toast.success("Expense deleted!");
		} catch (e) {
			throw new Error("There was a problem deleting your expense.");
		}
	}
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
