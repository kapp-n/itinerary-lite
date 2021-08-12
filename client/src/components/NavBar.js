import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
    if (props.loggedIn){
        return (
            <div className="nav">
                <button className="nav1" onClick={props.logOut}>Log out</button>
                <Link to='/categories'>
                    <button className="nav2">My Trips</button>
                </Link>
                <Link to='/form'>
                    <button className="nav3">Add New Trip</button>
                </Link>
            </div>
        )
    } else {
        return (
            <div className="nav">
                <Link to='/signup'>
                    <button className="nav1">Sign Up</button>
                </Link>
                <Link to='/login'>
                    <button className="nav2">Login</button>
                </Link>
            </div>
        )
    }
}

export default NavBar