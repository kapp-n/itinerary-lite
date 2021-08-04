import React from 'react'
import { Link } from 'react-router-dom'

const Category = ({ category, deleteCategory }) => {
    return (
        <div id="category_card">
            <button id="delete_button" onClick={() => deleteCategory(category)}>X</button>
            <Link id="category" to={`/categories/${category.id}`}>
                <h2 id="category_name">{category.name}</h2>
            </Link>
        </div>
    )
}


export default Category