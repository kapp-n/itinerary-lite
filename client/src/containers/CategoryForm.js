import React, { useState, useEffect } from 'react'

const CategoryForm = () => {
    const [categories, setCategories] = useState([])

   useEffect(() => {
    fetch('/categories/form')
    .then(r => r.json())
    .then(data => {
         console.log(data, "form")
         setCategories(data)
        })
   }, [])

const allCategories = categories.map(c => <option>{c.name}</option>)


    return (
        <div>
            <h1>New Trip Category Form</h1>
            <div className="form">
                <select name="categories" id="categories">
                    {allCategories}
                </select>
            </div>
        </div>
    )
}


export default CategoryForm