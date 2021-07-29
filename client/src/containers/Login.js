import React, { useState } from 'react'

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
		fetch('/login', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
		},
			body: JSON.stringify({
				username: username,
				password: password
			})
        })
		.then(r => r.json())
		.then(user => {
			console.log(user)
			if (user.error){
				setPassword("")
				const loginError = user.error
				setError(loginError)
			} else {
				onLogin(user)
			}
		})
    }


    return (
		<div>
            <div className="errors">
                {error}
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
			<br/>
			<input type="submit" />
        </form>
	</div>
	)
}

export default Login