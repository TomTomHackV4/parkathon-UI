import React, { Component } from 'react'

class ParkingPopup extends Component {

    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)

    }

    handleClick(){
        //this.props.onClick(this.props.latitude, this.props.longitude)
        console.log('Clicked ')
    }

    render() {
        console.log('Props: ', this.props)
        return (
            <div className="ParkingPopup">
                <button onClick={this.handleClick}>Navigate</button>
            </div>
        )
    }
}

export default ParkingPopup