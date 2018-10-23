export const ACTION_PARKED = 'ACTION_PARKED'
export const ACTION_NOT_PARKED = 'ACTION_NOT_PARKED'
export const ACTION_SELECT_DESTINATION = 'ACTION_SELECT_DESTINATION'
export const ACTION_NAVIGATE = 'ACTION_NAVIGATE'
export const ACTION_CANCEL = 'ACTION_CANCEL'

export const actionParked = () => ({
    type: ACTION_PARKED
})

export const actionNotParked = () => ({
    type: ACTION_NOT_PARKED
})

export const actionSelectDestination = (destinationMarker,route) => ({
    destinationMarker, route, type: ACTION_SELECT_DESTINATION
})

export const actionNavigate = () => ({
    type: ACTION_NAVIGATE
})

export const actionCancel = () => ({
    type: ACTION_CANCEL
})