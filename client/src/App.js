import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import Home from'./components/Home'
import NavBar from './components/NavBar'
import Signup  from './containers/Signup'
import Login from './containers/Login'
import Categories from './containers/Categories'
import FullTrip  from './containers/FullTrip'
import './App.css';
import TripForm from './containers/TripForm'
import FullCategory from './containers/FullCategory'

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



  const onLogin = (u) => {
    setLoggedIn(true)
    setUser(u)
    history.push('/')
  }

  const logOut = () => {
    fetch('/logout', {
      method: "DELETE"
    })
    .then(() => {
      setLoggedIn(false)
      setUser({})
      history.push('/')
    })
  }


  return (
    <div className="App">
      <NavBar onLogin={onLogin} loggedIn={loggedIn} logOut={logOut} />
      <Switch>
        <Route exact path='/' render={routerProps => <Home {...routerProps} loggedIn={loggedIn} user={user} />} />
        <Route exact path='/signup' render={routerProps => <Signup {...routerProps} onLogin={onLogin} />} />
        <Route exact path='/login' render={routerProps => <Login {...routerProps} onLogin={onLogin} />} />
        <Route exact path='/categories' render={routerProps => <Categories {...routerProps} user={user} />} />
        <Route exact path='/form' render={routerProps => <TripForm {...routerProps} user={user} loggedIn={loggedIn} />}/>
        <Route exact path='/categories/:id/trips' render={routerProps => <FullCategory {...routerProps} loggedIn={loggedIn} user={user} />} />
        <Route path='/categories/:category_id/trips/:id' render={routerProps => <FullTrip {...routerProps} user={user} loggedIn={loggedIn} />} />
      </Switch>
      
    </div>
  );
}

export default App;
