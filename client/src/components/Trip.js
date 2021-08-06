import React from 'react'
import { Link } from 'react-router-dom'

const Trip = ({ trip, category, deleteCategory }) => {
    return (
        <div id="trip_card">
            <button id="delete_button" onClick={() => deleteCategory(category)}>❌</button>
            <h2 id="category_name">{category.cname}</h2>
            <Link id="trip" to={`/trips/${trip.id}`}>
                <h5>{trip.locale}</h5>
            </Link>
        </div>
    )
}


export default Trip