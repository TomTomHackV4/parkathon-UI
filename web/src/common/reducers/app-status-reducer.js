import {
    ACTION_PARKED,
    ACTION_NOT_PARKED,
    ACTION_SELECT_DESTINATION,
    ACTION_NAVIGATE,
    ACTION_CANCEL
}from '../actions/app-status-actions'

export const USER_STATUS_NOT_PARKED = 'not_parked'
export const USER_STATUS_PARKED = 'parked'
export const USER_STATUS_MARKER_SELECTED = 'marker_selected'
export const USER_STATUS_NAVIGATE = 'navigate'

const DEFAULT_STATE = {
    userState: USER_STATUS_NOT_PARKED,
    previousState: null,
    destinationMarker: null,
    route: null
}

const appStatusReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case ACTION_PARKED:
            return { ...DEFAULT_STATE, userState: USER_STATUS_PARKED, previousState: USER_STATUS_PARKED }
        case ACTION_NOT_PARKED:
            return { ...DEFAULT_STATE, userState: USER_STATUS_NOT_PARKED, previousState: USER_STATUS_NOT_PARKED }
        case ACTION_SELECT_DESTINATION:
            return {
                ...state,
                destinationMarker: action.destinationMarker,
                route: action.route,
                userState: USER_STATUS_MARKER_SELECTED
            }
        case ACTION_NAVIGATE:
            return {
                ...state,
                userState: USER_STATUS_NAVIGATE,
                previousState: USER_STATUS_NOT_PARKED
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