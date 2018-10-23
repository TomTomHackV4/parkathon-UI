import { ACTION_PARKED, ACTION_NOT_PARKED, ACTION_SELECT_DESTINATION, ACTION_NAVIGATE, ACTION_CANCEL }from '../actions/app-status-actions'

const DEFAULT_STATE = {
    userState: 'not-parked',
    previousState: null,
    destinationMarker: null,
    route: null
}

const appStatusReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case ACTION_PARKED:
            return { ...DEFAULT_STATE, userState: 'parked', previousState: 'parked' }
        case ACTION_NOT_PARKED:
            return { ...DEFAULT_STATE, userState: 'not-parked',previousState: 'not-parked' }
        case ACTION_SELECT_DESTINATION:
            return {
                ...state,
                destinationMarker: action.destinationMarker,
                route: action.route,
                userState: 'markerSelected'
            }
        case ACTION_NAVIGATE:
            return {
                ...state,
                userState: 'navigate',
                previousState: 'not-parked'
            }
        case ACTION_CANCEL:
            return {
                ...DEFAULT_STATE,
                userState: state.previousState,
                previousState: state.previousState
            }
        default:
            return state
    }
}

export default appStatusReducer