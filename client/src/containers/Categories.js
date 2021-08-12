import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'




const Categories = ({ user }) => {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState("")
    
    
    

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

   

   const uniqueArray = [...new Map(categories.map(item => [item['cname'], item])).values()]
    const myCategories = uniqueArray.map(c => <Link to={`/categories/${c.id}/trips`}> <h1 id="category_name"> ⭐️ {c.cname}</h1></Link>)

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
