import React, { useState } from 'react'

const TripForm = () => {
    const [trip, setTrip] = useState({})



    const handleSubmit = (e) => {
        console.log(e)
    }


    return (
        <div className="form">
            {/* {this.props.errors} */}
            <p>First, enter a location (city, state, etc.) for your trip:</p>
            <form onSubmit={handleSubmit}>
                <label id= "pin">📍 </label>
                <input 
                    type="text" 
                    name="location"
                />

                <input type="submit" />
                </form>
        </div>
    )
}


export default TripForm