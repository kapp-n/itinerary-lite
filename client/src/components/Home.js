import React from 'react'

const Home = (props) => {
    if(props.loggedIn){
        return (
            <div>
                <h1>Welcome back, {`${props.user.username}`}</h1>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Welcome to Itinerary Lite</h1>
                <p>Please login or signup to start planning your dream vacation!</p>
            </div>
        )
    }
    
}

export default Home
