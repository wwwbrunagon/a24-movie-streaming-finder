import React, { useState } from 'react';

interface ProductionCompanySearchProps {
	onSearchById: (companyId: number) => void;
	onSearchByName: (companyName: string) => void;
}

const ProductionCompanySearch: React.FC<ProductionCompanySearchProps> = ({
	onSearchById,
	onSearchByName,
}) => {
	const [searchInput, setSearchInput] = useState('');

	const handleSearchById = () => {
		const id = parseInt(searchInput, 10);
		if (!isNaN(id)) {
			onSearchById(id);
		}
	};

	const handleSearchByName = () => {
		if (searchInput.trim().length > 0) {
			onSearchByName(searchInput.trim());
		}
	};

	return (
		<div className="production-company-search">
			<input
				type="text"
				value={searchInput}
				onChange={(e) => setSearchInput(e.target.value)}
				placeholder="Enter Production Company ID or Name"
			/>
			<button onClick={handleSearchById}>Search by ID</button>
			<button onClick={handleSearchByName}>Search by Name</button>
		</div>
	);
};

export default ProductionCompanySearch;
