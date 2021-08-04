import React, { useState, useEffect } from 'react'
import CategoryForm from './CategoryForm'

const Categories = ({ loggedIn, user }) => {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState("")
    const [errors, setErrors] = useState([])
    const [formFlag, setFormFlag] = useState(false)
    

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

    const addCategory = (c) => {
        fetch('/categories', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: c
            })
        })
        .then(r => r.json())
        .then(data => {
            console.log(data)
            if (data.errors){
                const dataErrors = data.errors.map(error => <h2 className="errors">{error}</h2>)
                setErrors(dataErrors)
            } else {
                setCategories([...categories, data])
                setFormFlag(false)
            } 
        })
    }
    
    

    const allCategories = categories.map(category => <h2>{category.name}</h2>)

    if (error === '') {
        return (
            <div>
                <br/>
                <br/>
                {formFlag ?
                        <CategoryForm addCategory={addCategory} errors={errors} />
                        :
                        <button id="add" onClick={() => setFormFlag(true)}>Add a Category</button>
                    }
                <div>
                    <h1>{user.username}'s trips</h1>
                    {allCategories}
                </div>
            </div>
        )
    } else {
        return (
            <h1 className="error">You're not logged in! Please login or sign-up!</h1>
        )
    }
}

export default Categories
