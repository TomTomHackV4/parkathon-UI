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

const DEFAULT_USER_STATE = USER_STATUS_PARKED

const DEFAULT_STATE = {
    userState: DEFAULT_USER_STATE,
    previousState: DEFAULT_USER_STATE,
    destinationMarker: null
}

const appStatusReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case ACTION_PARKED:
            return {
                 ...DEFAULT_STATE, 
                 userState: USER_STATUS_PARKED, 
                 previousState: USER_STATUS_PARKED, 
                 destinationMarker: DEFAULT_STATE.destinationMarker
            }
        case ACTION_NOT_PARKED:
            return { 
                ...DEFAULT_STATE, 
                userState: USER_STATUS_NOT_PARKED, 
                previousState: USER_STATUS_NOT_PARKED 
            }
        case ACTION_SELECT_DESTINATION:
            return {
                ...state,
                destinationMarker: action.destinationMarker,
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
                ...state,
                userState: state.previousState,
                previousState: state.previousState,
                destinationMarker: DEFAULT_STATE.destinationMarker
            }
        default:
            return state
    }
}

export default appStatusReducer