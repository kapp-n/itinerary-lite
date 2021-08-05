import React, { useState, useEffect } from 'react'
// import Trip from './Trip'

const CategoryWithTrips= (props) => {
    const [category, setCategory] = useState({})
    const [trips, setTrips] = useState([])
    const [error, setError] = useState("")
    const [formFlag, setFormFlag] = useState(false)
    


    useEffect(() => {
        fetch(`/trips`)
        .then(r => r.json())
        .then(trips => {
            console.log(trips)
			// if (trips.error){
			// 	setError(trips.error)
			// } else {
			// 	setTrips(trips)
            // }
        })
    }, [])

    const addTrip = (e) => {
        e.preventDefault()
        // fetch(`/categories/${category.id}/trips`, {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({

        //     })
        // })
        // .then(r => r.json())
        // .then(data => {
        //     if (data.errors){
        //         setGames([...games])
        //         const dataErrors = data.errors.map(error => <h2 className="errors">{error}</h2>)
        //         setErrors(dataErrors)
        //     } else {
        //         setGames([...games, data])
        //         setFormFlag(false)
        //     }
        // })

    }


    //const allTrips = trips.map(trip => <Trip key={trip.id} trip={trip} /> )

    

    if (props.loggedIn) {
        return (
            <div id="trips">
                {/* <h1>{props.user.username}'s {category.name} trips</h1> */}
                {/* {allTrips} */}
                <div className="form">
                    {formFlag?
                        <form onSubmit={addTrip}>
                            <label>Let's start with location:</label>
                            <br/>
                            <br/>
                            <input
                                type="text"
                                name="location"
                    
                            />
                            <input type="submit" />
                        </form>
                        :
                        <button onClick={() => setFormFlag(true)}>Add Trip</button>
                    }
                </div>
            </div>
        )
    } else {
        return (
            <h1 className="error">{error}</h1>
        )
    }
}


export default CategoryWithTrips