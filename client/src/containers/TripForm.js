import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const TripForm = ({ loggedIn }) => {
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
    const [categories, setCategories] = useState([])
    const [formFlag, setFormFlag] = useState(false)
    const history = useHistory()

   useEffect(() => {
       fetch('/categories/form')
       .then(r => r.json())
       .then(data =>{
           setCategories(data)
       })
   }, [])


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
            if(data.error){
                setError(data.error)
            } else {
                console.log(data)
                setCategory(data)
                setError("")
                setFormFlag(true)
            }
        })
    }

    const handleChange = (e) => {
        if(e.target.name === 'cname'){
            setCategory({
                [e.target.name]: e.target.value
            })
        } else {
            setTrip({
                ...trip,
                [e.target.name]: e.target.value
            })
            console.log(trip)
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(trip)
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
				history.push('/categories')
			}
        })
    }

    const allCategories = categories.map(c => <option value={c.cname}>{c.cname}</option>)


    if(loggedIn){
        if(!formFlag){
            return (
                    <form id="add_cat" onSubmit={handleCatSubmit}>
                        <h4 id="form_error">{error}</h4>
                        <label>First, let's add a category for your trip. Please select from a list of existing categories, or, 
                            if none of these are what you're looking for, you may create your own.</label>
                            <input 
                                type="text"
                                name="cname"
                                onChange={handleChange}
                            />
                            <select name="cname" id="add_cat_select" onChange={handleChange}>
                                <option value="none" selected disabled hidden>Select Category</option>
                                {allCategories}
                            </select>
                            <input id="add_cat_submit" type="submit" />
                    </form>
            )
        } else {
            return (
                <div className="add_trip">
                    <div id="add_trip_div">
                        <h2 id="category_trip_form">{category.cname}</h2>
                        <hr id="add_trip_hr"/>
                        <h4 id="form_error">{error}</h4>
                        <form id="add_trip_form" onSubmit={handleSubmit}>
                            <label id= "p"> First, enter a location (city, state, etc.) for your trip:</label>
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