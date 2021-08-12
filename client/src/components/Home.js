import React from 'react'

const Home = (props) => {
    if(props.loggedIn){
        return (
            <div className="home">
                <h1>Welcome back, {`${props.user.username}`}</h1>
                <h4>Start planning now by clicking 'Add new trip' or view your existing trips in 'My trips'</h4>
            </div>
        )
    } else {
        return (
            <div className="home">
                <h1>Welcome to Itinerary Lite</h1>
                <p>Please login or signup to start planning your dream vacation!</p>
            </div>
        )
    }
    
}

export default Home
