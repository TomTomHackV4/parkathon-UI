import React, { Component } from 'react'
import './main-view.css';
import { connect } from 'react-redux'
import {
    getMapPoints,
    getSpotsActions,
    actionParked,
    actionNotParked,
    actionSelectDestination,
    actionNavigate,
    actionCancel
} from '../../../common'
import { MapView } from '../../map'
import {
    USER_STATUS_MARKER_SELECTED,
    USER_STATUS_NAVIGATE,
    USER_STATUS_NOT_PARKED,
    USER_STATUS_PARKED
} from '../../../common/reducers/app-status-reducer'

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
        return (
            <div className="App">
                {this.renderButtons()}
                <div className="map">
                    <MapView destinationMarker = {this.props.appStatus.destinationMarker}
                        freeParkingSpots={this.props.mapPoints}
                        onMarkerClicked={(destinationMarker) => onClickButtonState(BUTTON_IDS.MARKER_SELECTED, destinationMarker)} />
                </div>
            </div>
        )
    }

    renderButtons () {
        const { onClickButtonState, appStatus } = this.props
        const { userState } = appStatus

        // Decide whether the buttons must be disabled or not
        const disableParkedButton = (
            userState === USER_STATUS_PARKED
        )
        const disableNotParkedButton = (
            userState === USER_STATUS_NOT_PARKED ||
            userState === USER_STATUS_NAVIGATE ||
            userState === USER_STATUS_MARKER_SELECTED
        )
        const disableNavigateButton = (
            userState === USER_STATUS_NOT_PARKED ||
            userState === USER_STATUS_PARKED
        )
        const disableCancelButton = (
            userState === USER_STATUS_PARKED ||
            userState === USER_STATUS_NOT_PARKED
        )

        return (
            <div className='button-wrapper'>
                <div className='button-container'>
                    <button disabled={disableParkedButton}
                        onClick={() => onClickButtonState(BUTTON_IDS.I_AM_PARKED)}>
                        I am parked
                    </button>
                    <button disabled={disableNotParkedButton}
                        onClick={() => onClickButtonState(BUTTON_IDS.I_AM_NOT_PARKED)}>
                        I am not parked
                    </button>
                    <button disabled={disableNavigateButton}
                        onClick={() => onClickButtonState(BUTTON_IDS.NAVIGATE)}>
                        Navigate
                    </button>
                    <button disabled={disableCancelButton}
                        onClick={() => onClickButtonState(BUTTON_IDS.CANCEL)}>
                        Cancel
                    </button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        chargeMapPoints: () => getSpotsActions.fetch().then((data) => dispatch(getMapPoints(data))),
        onClickButtonState: (clickedButtonId, destinationMarker) => {
            switch (clickedButtonId) {
                case BUTTON_IDS.I_AM_PARKED:
                    dispatch(actionParked())
                    // TODO Notify Backend here
                    break
                case BUTTON_IDS.I_AM_NOT_PARKED:
                    dispatch(actionNotParked())
                    // TODO Notify Backend here
                    break
                case BUTTON_IDS.MARKER_SELECTED:
                    dispatch(actionSelectDestination(destinationMarker))
                    // TODO Notify Backend here
                    break
                case BUTTON_IDS.NAVIGATE:
                    dispatch(actionNavigate())
                    break
                case BUTTON_IDS.CANCEL:
                    dispatch(actionCancel())
                    break
                default:
                    console.error('Unexpected button clicked')
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