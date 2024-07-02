import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard, {
	dashboardAction,
	dashboardLoader,
} from "./components/Dashboard";
import Error from "./components/Error";
import Main, { mainLoader } from "./layouts/Main";
import { logoutAction } from "./actions/logoutAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpensesPage, { expensesAction } from "./components/ExpensesPage";
import { expensesLoader } from "./components/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./components/BudgetPage";
import { deleteBudget } from "./actions/deleteBudget";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		loader: mainLoader,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Dashboard />,
				loader: dashboardLoader,
				action: dashboardAction,
				errorElement: <Error />,
			},
			{
				path: "budget/:id",
				element: <BudgetPage />,
				loader: budgetLoader,
				action: budgetAction,
				errorElement: <Error />,
				children: [
					{
						path: "delete",
						action: deleteBudget,
					},
				],
			},
			{
				path: "expenses",
				element: <ExpensesPage />,
				loader: expensesLoader,
				action: expensesAction,
				errorElement: <Error />,
			},
			{
				path: "Logout",
				action: logoutAction,
			},
		],
	},
]);

function App() {
	return (
		<div className="App">
			<ToastContainer />
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
