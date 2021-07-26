import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import Home from'./components/Home'
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const history = useHistory()

  useEffect(() => {
    fetch('/me')
    .then(r => {
      if(r.ok){
        r.json()
        .then(u => {
          setLoggedIn(true)
          setUser(u)
        })
      }
    })
  }, [])


  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={routerProps => <Home {...routerProps} loggedIn={loggedIn} user={user} />} />
      </Switch>
      
    </div>
  );
}

export default App;
