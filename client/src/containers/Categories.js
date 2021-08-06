import React, { useState, useEffect } from 'react'
import CategoryForm from './CategoryForm'
import Trip  from '../components/Trip'
import TripForm from './TripForm'

const Categories = ({ user }) => {
    const [trips, setTrips] = useState([])
    const [error, setError] = useState("")
    const [errors, setErrors] = useState([])
    const [categoryFormFlag, setCategoryFormFlag] = useState(false)
    const [tripFormFlag, setTripFormFlag] = useState(false)
    

    useEffect(() => {
        fetch('/trips')
        .then(r => r.json())
        .then(data =>{
            console.log(data)
            if(data.error){
                setError(data.error)
            } else {
                setTrips(data)
                console.log(trips, "trips")
            }
        })
    }, [])

    const addTrip = (t) => {
        setTrips([...trips, t])
        setTripFormFlag(false)
    }

    const addCategory = (c) => {
        console.log(c, 'c')
        fetch('/categories', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cname: c
            })
        })
        .then(r => r.json())
        .then(data => {
            console.log(data)
            if (data.errors) {
                setErrors(data.errors)
            } else {
                setCategoryFormFlag(false)
            } 
        })
    }

    const deleteCategory = (c) => {
        fetch(`/categories/${c.id}`, {
            method: "DELETE",
        })
        .then(r => {
            if(r.ok) {
                const newTrips = trips.filter(trip => trip.category.id !== c.id)
                setTrips(newTrips)
            }
        })
    }
    
    

    const allTrips = trips.map(trip => <Trip key={trip.id} deleteCategory={deleteCategory} trip={trip} category={trip.category}  />)

    if (error === '') {
        return (
            <div>
                <br/>
                <br/>
                <div>
                    <h1>{user.username}'s trips</h1>
                    {categoryFormFlag ?
                        <CategoryForm addCategory={addCategory} errors={errors} />
                        :
                        <button className="button" onClick={() => setCategoryFormFlag(true)}>Add a Category</button>
                    }
                    <br/>
                    <br/>
                    {tripFormFlag ?
                        <TripForm addTrip={addTrip}  />
                        :
                        <button className="button" onClick={() => setTripFormFlag(true)}>Start planning your new trip!</button>
                    }
                    {allTrips}
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

