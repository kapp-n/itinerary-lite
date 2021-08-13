import React from 'react'
//import EditTrip from './EditTrip'

const FullTrip = () => {
    // const [trip, setTrip] = useState({})
    // const [errors, setErrors] = useState([])
    // const [error, setError] = useState("")
    // const [formFlag, setFormFlag] = useState(false)

    // useEffect(() => {
    //     fetch(`/trips/${props.match.params.id}`)
    //     .then( r => r.json())
    //     .then(t => {
    //         console.log(t, "full trip")
    //         if (t.error) {
    //             setError(t.error)
    //         } else {
    //             setTrip(t)
    //         }
    //     })
    // }, [])

    // const editTrip = (t) => {
    //     fetch(`/trips/${trip.id}`, {
    //         method: "PATCH",
    //         headers: {
    //             'Content-Type' : 'application/json'
    //         },
    //         body: JSON.stringify(t)
    //     })
    //     .then(r => r.json())
	// 	.then(t => {
	// 		console.log(t)
	// 		if (t.errors){
    //             const dataErrors = t.errors.map(error => <h3 className="error">{error}</h3>)
    //             setErrors(dataErrors)
	// 		} else {
	// 			setTrip(t)
    //             setFormFlag(false)
	// 		}
    //     })
    // }


    return (
        <div>
            <h1>hi</h1>
        </div>
    )
    // if(formFlag){
    //     return(
    //         <EditTrip editTrip={editTrip} trip={trip} errors={errors} />
    //     )
    // } else if (error === '') {
    //     return (
    //         <div className="full_trip">
    //             <h1 id="locale">{trip.locale}</h1>
    //             {/* <h6 id="cname">{trip.category.cname}</h6> */}
    //             <hr className="trip_hr"/>
    //             <h5>Where you're staying:</h5> 
    //             <p id="lodging">{trip.lodging}</p>
    //             <h5>What do you want to do or see while you're there:</h5>                    
    //             <p id="things_to_see">{trip.things_to_see}</p>
    //             <hr className="trip_hr"/>
    //             <button className="button" onClick={() => setFormFlag(true)}>Edit or add to your trip</button>
    //             </div>
    //     )
    // } else {
    //     return(
    //          <h1 className="error">{error}</h1>
    //     )
    // }
    
}


export default FullTrip