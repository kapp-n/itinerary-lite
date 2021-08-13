import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import EditTrip from './EditTrip'

const FullTrip = (props) => {
    const [trip, setTrip] = useState({})
    const [category, setCategory] = useState(null)
    const [errors, setErrors] = useState([])
    const [error, setError] = useState("")
    const [formFlag, setFormFlag] = useState(false)
    const history = useHistory()

    useEffect(() => {
        fetch(`/categories/${props.match.params.category_id}/trips/${props.match.params.id}`)
        .then( r => r.json())
        .then(t => {
            console.log(t, "full trip")
            if (t.error) {
                setError(t.error)
            } else {
                setTrip(t)
                setCategory(t.category.id)
                console.log(t.category.id)
            }
        })
    }, [])

    const editTrip = (t) => {
        fetch(`/categories/${category}/trips/${trip.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(t)
        })
        .then(r => r.json())
		.then(t => {
			console.log(t)
			if (t.errors){
                const dataErrors = t.errors.map(error => <h3 className="error">{error}</h3>)
                setErrors(dataErrors)
			} else {
				setTrip(t)
                setFormFlag(false)
			}
        })
    }

    const deleteTrip = () => {
        fetch(`/categories/${category}/trips/${trip.id}`,{
            method: "DELETE"
        })
        .then(r => {
            if(r.ok){
                history.push(`/categories`)
            }
        })
    }


   
    if(formFlag){
        return(
            <EditTrip editTrip={editTrip} trip={trip} errors={errors} />
        )
    } else if (error === '') {
        return (
            <div className="full_trip">
                <h1 id="locale">{trip.locale}</h1>
                <hr id="full_trip_hr"/>
                <h5 id="where">Where are you staying?</h5> 
                <p id="full_lodging">{trip.lodging}</p>
                <h5 id="what">What do you want to do or see while you're there?</h5>                    
                <p id="full_things_to_see">{trip.things_to_see}</p>
                <hr className="trip_hr"/>
                <div id="full_buttons">
                    <button className="button" onClick={() => setFormFlag(true)}>Edit/add to your trip</button>
                    <button onClick={deleteTrip} className="button">Delete this trip</button>
                </div>
            </div>
        )
    } else {
        return(
             <h1 className="error">{error}</h1>
        )
    }
    
}


export default FullTrip