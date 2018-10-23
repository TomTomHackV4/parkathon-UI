import React, { Component } from 'react'
import './main-view.css';
import { connect } from 'react-redux'
import { getMapPoints } from '../../../common'
import { MapView } from '../../map'

class MainView extends Component {
    render() {
        console.log('Props: ', this.props)
        return (
            <div className="App">
                <div className="app-header">
                    <h1>Parkathon App</h1>
                </div>
                <div className="map">
                    <MapView freeParkingSpots = {[{"latitude":52.519735,"longitude":13.337614},{"latitude":52.518735,"longitude":13.338614},{"latitude":52.517735,"longitude":13.339614}]}/>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log('MapDispatchToProps', dispatch)
    return {
        chargeMapPoints: () => {
            console.log('Map points changed')
            dispatch(getMapPoints())
        }
    }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps', state)
    return {
        mapPoints: state.mapPoints
    }
}

const connectedMain = connect(mapStateToProps, mapDispatchToProps)(MainView)
export default connectedMain