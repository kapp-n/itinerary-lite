import React, { useState, useEffect } from 'react'




const Categories = ({ user }) => {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState("")
    const [errors, setErrors] = useState([])
    
    

    useEffect(() => {
        fetch('/categories')
        .then(r => r.json())
        .then(data =>{
            console.log(data)
            if(data.error){
                setError(data.error)
            } else {
                setCategories(data)
                console.log(categories, "all categories")
            }
        })
    }, [])




    // const deleteCategory = (c) => {
    //     fetch(`/categories/${c.id}`, {
    //         method: "DELETE",
    //     })
    //     .then(r => {
    //         if(r.ok) {
    //             const newTrips = trips.filter(trip => trip.category.id !== c.id)
    //             setTrips(newTrips)
    //         }
    //     })
    // }

   
   const catArray = categories.map(c => c.cname)
   const uniqueArray = [...new Set(catArray)]
    const myCategories = uniqueArray.map(c => <h1 id="category_name"> ⭐️ {c}</h1>)

    if (error === '') {
        return (
            <div className="trip_page">
                <br/>
                <br/>
                <p id="map">🗺</p>
                    <h1 id="username">{user.username}'s itinerary</h1>
                    <hr/>
                    <div id="all_cat">
                    {myCategories}
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
