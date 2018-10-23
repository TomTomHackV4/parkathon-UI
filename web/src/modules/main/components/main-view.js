import React, { Component } from 'react'
import './main-view.css';
import { connect } from 'react-redux'
import { getMapPoints, getSpotsActions, actionParked, actionNotParked, actionNavigate, actionCancel } from '../../../common'
import { MapView } from '../../map'

const BUTTON_IDS = {
    I_AM_PARKED: 'I_AM_PARKED',
    I_AM_NOT_PARKED: 'I_AM_NOT_PARKED',
    MARKER_SELECTED: 'MARKER_SELECTED',
    NAVIGATE: 'NAVIGATE',
    CANCEL: 'CANCEL',
}

class MainView extends Component {
    componentWillMount () {
        this.props.chargeMapPoints()
    }

    render() {
        const { onClickButtonState } = this.props
        console.log('appStatus', this.props.appStatus)
        return (
            <div className="App">
                <div className="app-header">
                    <h1>
                        Parkathon App
                    </h1>
                </div>
                <div>
                    <button onClick={() => onClickButtonState(BUTTON_IDS.I_AM_PARKED)}>I am parked</button>
                    <button onClick={() => onClickButtonState(BUTTON_IDS.I_AM_NOT_PARKED)}>I am not parked</button>
                    <button onClick={() => onClickButtonState(BUTTON_IDS.NAVIGATE)}>Navigate</button>
                    <button onClick={() => onClickButtonState(BUTTON_IDS.CANCEL)}>Cancel</button>
                </div>
                <div className="map">
                    <MapView freeParkingSpots={this.props.mapPoints}/>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        chargeMapPoints: () => getSpotsActions.fetch().then((data) => dispatch(getMapPoints(data))),
        onClickButtonState: (clickedButtonId) => {
            switch (clickedButtonId) {
                case BUTTON_IDS.I_AM_PARKED:
                    dispatch(actionParked())
                    // TODO Notify Backend here
                    break
                case BUTTON_IDS.I_AM_NOT_PARKED:
                    dispatch(actionNotParked())
                    // TODO Notify Backend here
                    break
                case BUTTON_IDS.NAVIGATE:
                    dispatch(actionNavigate())
                    break
                case BUTTON_IDS.CANCEL:
                    dispatch(actionCancel())
                    break
                default:
                    console.log('Unexpected button clicked: ' + clickedButtonId)
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        mapPoints: state.mapPoints,
        appStatus: state.appState
    }
}

const connectedMain = connect(mapStateToProps, mapDispatchToProps)(MainView)
export default connectedMain