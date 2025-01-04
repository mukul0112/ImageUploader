import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchAssets.css";

const SearchAssets = ({setDisplayData,displayData,uploadedImages}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Oldest First");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setDisplayData(uploadedImages.filter((item)=>item.description.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  const handleSortChange = () => {
    setSortOrder((prevOrder) =>
      prevOrder === "Newest First" ? "Oldest First" : "Newest First"
    );
    setDisplayData([...displayData].reverse());
  };

  const handleAddClick = () => {
    console.log("Add button clicked");
    navigate("/home");
  };

  return (
    <div className="search-assets-container">
      <div className="search-sort-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Assets (as per description added)"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button className="search-icon">
            <span role="img" aria-label="search">
              🔍
            </span>
          </button>
        </div>
        <button className="sort-button" onClick={handleSortChange}>
          {sortOrder}
        </button>
      </div>
      <button className="add-button" onClick={handleAddClick}>
        + Add
      </button>
    </div>
  );
};

export default SearchAssets;
