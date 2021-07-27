import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
    if (props.loggedIn){
        return (
            <div>
                <button class="nav" onClick={props.logOut}>Log out</button>
                <button class="nav">My Trips</button>
            </div>
        )
    } else {
        return (
            <div>
                <Link to='/signup'>
                    <button class="nav">Sign Up</button>
                </Link>
                <Link to='/login'>
                    <button class="nav">Login</button>
                </Link>
            </div>
        )
    }
}

export default NavBar