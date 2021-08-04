import React, { useState, useEffect } from 'react'

const CategoryForm = ({ addCategory, errors }) => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')

   useEffect(() => {
    fetch('/categories/form')
    .then(r => r.json())
    .then(data => {
         setName(data[0].name)
         console.log(data, "form")
         setCategories(data)
        })
   }, [])

   const handleSubmit = (e) => {
       e.preventDefault()
       console.log(name)
       addCategory(name)
    }



   const handleChange = (e) => {
       console.log(e.target.value)
       setName(e.target.value)
   }

const allCategories = categories.map(c => <option value={c.name}>{c.name}</option>)


    return (
        <div>
            <h3>New Trip Category Form</h3>
            <div className="form">
                <p>select from existing categories</p>
                {errors}
                <form id="exists" onSubmit={handleSubmit}>
                    <select id="categories" onChange={handleChange}>
                        {allCategories}
                    </select>
                    <input type="submit" />
                </form>
                <p>or name your own:</p>
                <form onSubmit={handleSubmit}>
                    <label>Category:</label>
                    <input 
                        type="text" 
                        name="name"
                        onChange={handleChange}
                    />
                    <input type= "submit" />
                </form>
            </div>
        </div>
    )
}


export default CategoryForm