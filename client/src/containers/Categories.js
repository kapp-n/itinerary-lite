import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Categories = ({ loggedIn, user }) => {
    const [categories, setCategories] = useState([])
    const [errors, setErrors] = useState("")
    const [error, setError] = useState("")
    

    useEffect(() => {
        fetch('/categories')
        .then(r => r.json())
        .then(data =>{
            console.log(data, "categories")
            if(data.error){
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    }, [])

    
    

    const allCategories = categories.map(category => <h2>{category.name}</h2>)

    return (
        <div>
            <br/>
            <br/>
                <Link to='/categories/form'>
                    <button className="button">Add a new category of trips here!</button>
                </Link>
            <div>
                <h1>{user.username}'s trips</h1>
                {allCategories}
            </div>
        </div>
    )
}

export default Categories
