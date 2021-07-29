import React, { useState } from 'react'

const Signup = ({ onLogin }) => {
    const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/signup', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                password_confirmation: passwordConfirmation
            })
        })
        .then(r => r.json())
        .then(user => {
            if (user.errors){
                setPassword('')
                setPasswordConfirmation('')
                const signupErrors = user.errors.map(e => <h5>{e}</h5>)
                setErrors(signupErrors)
            } else {
                onLogin(user)
            }
        })
    }


    return (
        <div class="login">
            <div className="errors">
                {errors}
            </div>
        <form className="form" onSubmit={handleSubmit}>
			<label>Username </label>
            <br/>
			<input 
				type="text" 
				id="username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<br/>
			<label>Password </label>
            <br/>
			<input 
				type="password" 
				id="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<br/>
			<label>Confirm Password </label>
            <br/>
			<input 
				type="password" 
				id="password_confirmation"
				value={passwordConfirmation}
				onChange={(e) => setPasswordConfirmation(e.target.value)}
			/>
			<br/>
			<br/>
			<input type="submit" />
        </form>
        </div>
    )
}

export default Signup
