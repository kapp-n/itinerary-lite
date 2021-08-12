import React, { useState } from 'react'

const TripForm = ({ loggedIn }) => {
    const [successMessage, setSuccessMessage] = useState("")
    const [error, setError] = useState("")
    const [trip, setTrip] = useState({
        locale: "",
        lodging: "",
        things_to_see: "",
        category_id: null
    })
    const [category, setCategory] = useState({
        cname: "",
        id: null
    })
    const [formFlag, setFormFlag] = useState(false)

   


    const handleCatSubmit = (e) => {
        e.preventDefault()
        fetch('/categories', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setCategory(data)
            setFormFlag(true)
        })
    }

    const handleChange = (e) => {
        if(e.target.name === 'cname'){
            setCategory({
                [e.target.name]: e.target.value
            })
        } else {
            setTrip({
                [e.target.name]: e.target.value
            })
        }
    }




    const handleSubmit = (e) => {
        e.preventDefault()
        const newTrip = {
            locale: trip.locale,
            lodging: trip.lodging,
            things_to_see: trip.things_to_see,
            category_id: category.id
        }
        console.log(newTrip)
        fetch(`/categories/${category.id}/trips`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTrip)
        })
        .then(r => r.json())
		.then(trip => {
			console.log(trip)
			if (trip.error){
				setError(trip.error)
			} else {
                setError("")
				setSuccessMessage("Your trip has been created! If you wish to view your trip, use the navigation above")
			}
        })
    }

    if(loggedIn){
        if(!formFlag){
            return (
                    <form id="add_cat" onSubmit={handleCatSubmit}>
                        <label>First, let's add a category for your trip. This can be 
                            an existing category in your itinerary or a new one</label>
                            <input 
                                type="text"
                                name="cname"
                                onChange={handleChange}
                            />
                            <input className="submit" type="submit" />
                    </form>
            )
        } else {
            return (
                <div className="add_trip">
                    <div id="add_trip_form">
                        <h2 id="category_trip_form">{category.cname}</h2>
                        <h4 id="form_error">{error}</h4>
                        <p id="p">First, enter a location (city, state, etc.) for your trip:</p>
                        <form onSubmit={handleSubmit}>
                            <label id= "pin">📍 </label>
                            <input
                                id="pin_label"
                                size="26" 
                                type="text" 
                                name="locale"
                                onChange={handleChange}
                            />
                            <br/>
                            <br/>
                            <label id="lodging_label">Where are you staying?</label>
                            <br/>
                            <input 
                                size="26"
                                id="lodging"
                                type="text"
                                name="lodging"
                                onChange={handleChange}
                            />
                            <br/>
                            <br/>
                            <label id="add_things_label">Anything you'd like to do there?</label>
                            <br/>
                            <textarea 
                            id="add_things"
                            name="things_to_see" 
                            rows="4" 
                            cols="50"
                            onChange={handleChange}
                            />
                            <br/>
                            <input id="add_submit" type="submit" value="Add to Itinerary!" />
                            </form>
                            <h2 id="success_message">{successMessage}</h2>
                    </div>
                </div>
            )
        }
    } else {
        return (
            <h1 className="error">You're not logged in! Please login or sign-up!</h1>
        )
    }
}


export default TripForm