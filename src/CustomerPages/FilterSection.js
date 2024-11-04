import React, { useState, useEffect, useMemo } from 'react';
import '../CustomerPages_css/FilterSection.css'; // Ensure CSS is well-structured

function FilterSection({ items = [], onFilter }) {
    const [sortType, setSortType] = useState("");
    const [category, setCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCount, setFilteredCount] = useState(items.length); // State to store filtered item count

    // Memoize categories for performance
    const categories = useMemo(() => [...new Set(items.map(item => item.category))], [items]);

    // Apply filters whenever any filter value changes
    useEffect(() => {
        const applyFilters = () => {
            let filteredItems = [...items];

            if (sortType === "lowToHigh") filteredItems.sort((a, b) => a.price - b.price);
            else if (sortType === "highToLow") filteredItems.sort((a, b) => b.price - a.price);
            else if (sortType === "aToZ") filteredItems.sort((a, b) => a.name.localeCompare(b.name));
            else if (sortType === "zToA") filteredItems.sort((a, b) => b.name.localeCompare(a.name));

            if (category) {
                filteredItems = filteredItems.filter(item => item.category === category);
            }

            if (searchTerm) {
                filteredItems = filteredItems.filter(item =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            setFilteredCount(filteredItems.length); // Update filtered item count
            onFilter(filteredItems);
        };

        applyFilters();
    }, [sortType, category, searchTerm, items]); // Removed `onFilter` from dependency array

    // Reset all filter values to default
    const resetFilters = () => {
        setSortType("");
        setCategory("");
        setSearchTerm("");
        setFilteredCount(items.length); // Reset the count to full list count
        onFilter(items); // Reset the filtered items to the full list
    };

    return (
        <div className="filter-section-depth">

            <select value={sortType} onChange={e => setSortType(e.target.value)} className="filter-select">
                <option value="" disabled>Sort By</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="aToZ">Name: A to Z</option>
                <option value="zToA">Name: Z to A</option>
            </select>

            <select value={category} onChange={e => setCategory(e.target.value)} className="filter-select">
                <option value="" disabled>All Categories</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
            </select>

            <input 
                type="text" 
                placeholder="SEARCH HERE.." 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
                className="search-input"
                />

            <button onClick={resetFilters} className="reset-button">Reset Filters</button>
                <div className="product-count">{filteredCount} Products are Available</div>
        </div>
    );
}

export default FilterSection;
