import React, { useState, useEffect } from 'react';
import '../RecipeList.css';
import { Navbar } from './Navbar';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('https://dummyjson.com/recipes');
      const data = await response.json();
      setRecipes(data);
      setFilteredRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/recipes/search?q=${searchQuery}`);
      const data = await response.json();
      setFilteredRecipes(data);
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Navbar>
    
    <div className="recipe-list-container">
      <h2>Recipe List</h2>
      <div className="search-container">
        <input type="text" placeholder="Search recipes..." value={searchQuery} onChange={handleChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="recipe-list">
        {filteredRecipes?.recipes?.map(recipe => (
          <div className="recipe" key={recipe.id}>
            <h3>{recipe.name}</h3>
            <img src={recipe.image} alt={recipe.title} />
            <p>Ingredients: {recipe.ingredients.join(', ')}</p>
            <p>Instructions: {recipe.instructions}</p>
          </div>
        ))}
      </div>
    </div>
    </Navbar>
  );
};

export default RecipeList;
