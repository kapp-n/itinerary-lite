import React, { useState, useEffect } from 'react'

const TripForm = ({ addTrip }) => {
    const [locale, setLocale] = useState("")
    const [lodging, setLodging] = useState("")
    const [category_id, setCategoryId] = useState(1)
    const [error, setError] = useState("")
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch('/categories/form')
        .then(r => r.json())
        .then(data => {
             console.log(data, "form")
             setCategories(data)
            })
       }, [])



    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/trips', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                locale: locale,
                lodging: lodging,
                category_id: category_id
            })
        })
        .then(r => r.json())
		.then(trip => {
			console.log(trip)
			if (trip.error){
				setError(trip.error)
			} else {
				addTrip(trip)
			}
        })
    }

   

    const allCategories = categories.map(c => <option value={c.id}>{c.cname}</option>)

    return (
        <div className="form">
            {/* {this.props.errors} */}
            <p>First, enter a location (city, state, etc.) for your trip:</p>
            <form onSubmit={handleSubmit}>
                <label id= "pin">📍 </label>
                <input 
                    type="text" 
                    name="locale"
                    onChange={(e) => setLocale(e.target.value)}
                />
                <br/>
                <br/>
                <label>Where are you staying?</label>
                <br/>
                <input 
                    type="text"
                    name="lodging"
                    onChange={(e) => setLodging(e.target.value)}
                />
                <br/>
                <br/>
                <br/>
                <label>Select a category to add your trip to:</label>
                <select id="select" onChange={(e) => setCategoryId(e.target.value)}>
                    {allCategories}
                </select>
                <br/>
                <br/>
                <input type="submit" value="Add to Itinerary!" />
                </form>
        </div>
    )
}


export default TripForm