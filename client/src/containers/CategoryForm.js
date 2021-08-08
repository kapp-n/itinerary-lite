import React, { useState } from 'react'

const CategoryForm = ({ errors, addCategory }) => {
    const [category, setCategory] = useState('')



    const handleSubmit = (e) => {
        e.preventDefault()
        addCategory(category)
     }
    
    
    const handleChange = (e) => {
        console.log(e.target.value)
        setCategory(e.target.value)
        
    }

    return (
        <div id="add_cat">
            {errors}
                <form onSubmit={handleSubmit}>
                    <p>Add new category:</p>
                    <input 
                        type="text"
                        name="category"
                        onChange={handleChange}
                    />
                    <input className="submit" type="submit" />
                </form>
        </div>
    )   
}

export default CategoryForm
