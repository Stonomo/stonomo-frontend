import { useState } from "react";
import {
	Form,
	createSearchParams,
	redirect
} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// export async function action({ request }) {
// 	const data = await request.formData();
// 	const q = data.get('q');
// 	// console.log(q);
// 	return redirect(
// 		'/dashboard/results',
// 		createSearchParams({
// 			q: q,
// 			token: token
// 		})
// 	);
// }

export function SearchPage() {
	const { token } = useAuth();
	const [searchValue, setSearchValue] = useState('');

	function handleChange(e) {
		setSearchValue(e.target.value);
	}

	return (
		<>
			<h1>Search Eviction Database</h1>
			<Form action="/dashboard/results">
				<div className="search">
					<label htmlFor="search"></label>
					<input type="text"
						id="q"
						name="q"
						onChange={handleChange}
						value={searchValue} />
					<input type="hidden"
						id="token"
						name="token"
						value={token} />
					<input type="submit" value="Search" />
				</div>
			</Form>
		</>
	);
}

