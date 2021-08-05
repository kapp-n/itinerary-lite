import React from 'react'
import { Link } from 'react-router-dom'

const Category = ({ trip }) => {
    return (
        <div id="category_card">
            {/* <button id="delete_button" onClick={() => deleteCategory(category)}>🗑</button> */}
            <Link id="trip" to={`/trips/${trip.id}`}>
                <h2 id="category_name">{trip.category.name}</h2>
            </Link>
        </div>
    )
}


export default Category