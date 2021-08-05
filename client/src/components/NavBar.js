import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
    if (props.loggedIn){
        return (
            <div>
                <button className="nav" onClick={props.logOut}>Log out</button>
                <Link to='/trips'>
                    <button className="nav">My Trips</button>
                </Link>
            </div>
        )
    } else {
        return (
            <div>
                <Link to='/signup'>
                    <button className="nav">Sign Up</button>
                </Link>
                <Link to='/login'>
                    <button className="nav">Login</button>
                </Link>
            </div>
        )
    }
}

export default NavBar