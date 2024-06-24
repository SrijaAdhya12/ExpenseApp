import { toast } from "react-toastify";
import { deletedItem } from "../Helpers";

export function deleteBudget({ params }) {
	try {
		deletedItem({
			key: "budgets",
			id: params.id,
		});
		toast.success("Budget deleted successfully!");
	} catch (e) {
		throw new Error("There was a problem deleting your budget");
	}
}
