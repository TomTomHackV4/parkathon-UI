import React, { Component } from 'react'
import './main-view.css';
import { connect } from 'react-redux'
import { getMapPoints, getSpotsActions } from '../../../common'
import { MapView } from '../../map'

class MainView extends Component {
    render() {
        console.log('MapPoints', this.props.mapPoints)
        return (
            <div className="App">
                <div className="app-header">
                    <h1>Parkathon App</h1>
                    <button onClick={this.props.chargeMapPoints}>Click here!</button>
                </div>
                <div className="map">
                    <MapView />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        chargeMapPoints: () => {
            getSpotsActions.fetch().then((data) => dispatch(getMapPoints(data)))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        mapPoints: state.mapPoints
    }
}

const connectedMain = connect(mapStateToProps, mapDispatchToProps)(MainView)
export default connectedMain