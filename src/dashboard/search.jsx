import { useState } from "react";
import { Form } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

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

