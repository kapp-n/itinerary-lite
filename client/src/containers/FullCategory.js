import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

const FullCategory = (props) => {
    const [category, setCategory] = useState({})
    const [trips, setTrips] = useState([])
    const [selectTrip, setSelectTrip] = useState({
        locale: "",
        id: null
    })
    const history = useHistory()

    useEffect(() => {
        fetch(`/categories/${props.match.params.id}/trips`)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setTrips(data)
            setCategory(data[0].category)
            setSelectTrip({
                locale: data[0].locale,
                id: data[0].id
            })
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(selectTrip)
    }


    const handleChange = (e) => {
        console.log(e.target.value)
        setSelectTrip({
            locale: e.target.value,
            id: e.target.options[e.target.selectedIndex].id
        })
    }

    const handleDelete = () => {
        fetch(`/categories/${category.id}`, {
            method: "DELETE",
        })
        .then(r => {
            if(r.ok) {
                history.push('/categories')
            }
        })
    }


    
    
    const allTrips = trips.map(trip => <option value={trip.locale} id={trip.id}>📍 {trip.locale}</option>)



    if(props.loggedIn){
        return (
            <div id="full_cat_div">
                <h1 id="full_category">{category.cname}</h1>
                <hr id="cats_hr"/>
                <p className="trip_p">Pick a trip below to view it's details</p>
                <br/>
                <p className="trip_p">Or, you can delete this category from your itinerary (this will include its trips)</p>
                <button id="cat_delete_button" onClick={handleDelete}>Delete</button>
                <hr id="trips_hr"/>
                <br/>
                <form id="select_form" onSubmit={handleSubmit}>
                    <select name="trips" className="select_trips" onChange={handleChange}>
                      {allTrips}
                    </select>
                    <Link to={{
                        pathname: `/categories/${category.id}/trips/${selectTrip.id}`,
                    }}>
                        <input id="trip_submit" type="submit" value="Go"/>
                    </Link>
                </form>
            </div>
            )
    } else {
        return (
            <h1 className="error">You're not logged in! Please login or sign-up!</h1>
        )
    }
}

export default FullCategory