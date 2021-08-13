import React, { Component } from 'react'

export default class EditTrip extends Component {

    state = {
        locale : this.props.trip.locale,
        lodging : this.props.trip.lodging,
        things_to_see : this.props.trip.things_to_see,
	}

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.editTrip(this.state)
        console.log(this.state)
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    render() {
        return (
            <div id="edit_trip">
                {this.props.errors}
                <form id="edit_form" onSubmit={this.handleSubmit}>
                    <br/>
                    <label className="edit_label">Where will you be going? </label>
                    <br/>
                    <input 
                        className="edit_input"
                        type="text" 
                        name="locale"
                        value={this.state.locale}
                        onChange={this.handleChange}
                    />
                    <br/>               
                    <br/>
                    <label className="edit_label">Where are you staying?</label>
                    <br/>
                    <input  
                        className="edit_input"
                        type="text"
                        name="lodging"
                        value={this.state.lodging}
                        onChange={this.handleChange}
                    />
                    <br/>
                    <label className="edit_label" for="things_to_see">What do you want to do or see while you're there?</label>
                    <br/>
                    <textarea
                    id="edit_text" 
                    name="things_to_see" 
                    rows="4" 
                    cols="50"
                    value={this.state.things_to_see} 
                    onChange={this.handleChange}
                    />
                    <br/>
                    <input className="submit" type="submit" />
                </form>
            </div>
        )
    }
}
